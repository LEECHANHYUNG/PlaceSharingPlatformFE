import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import PlaceAdditional from '../../components/place/PlaceAdditional';
import PlaceAround from '../../components/place/PlaceAround';
import PlaceDescription from '../../components/place/PlaceDescription';
import PlaceInfo from '../../components/place/PlaceInfo';
import PlaceItemCount from '../../components/place/PlaceItemCount';
import PlaceMainImage from '../../components/place/PlaceMainImage';
import PlaceOpeningHours from '../../components/place/PlaceOpeningHours';
import ItemListForm from '../../components/place/reservation/ItemListForm';
import ReservationForm from '../../components/place/reservation/ReservationForm';
import Review from '../../components/place/review/Review';
import { reservationActions } from '../../store/reservation';
const Wrapper = styled.section`
  width: 70vw;
  margin: auto;
  padding-top: 100px;
  position: relative;

  .line {
    height: 3px;
    background: #999;
    width: 60vw;
    margin: auto;
  }

  .info-left {
    width: 60%;
    float: left;
    transition: all 0.5s;
  }

  .info-right {
    position: relative;
    width: 35%;
    float: right;
  }

  @media screen and (max-width: 1170px) {
    width: 90vw;
    height: auto;
    .line {
      width: 90vw;
    }
    .info-left {
      width: 100%;
    }
    .info-right {
      width: 100%;
    }
    .info-bottom {
      position: relative;
      bottom: 0px;
      height: 0px;
    }
  }
`;

const PlaceMainPage = ({ place }) => {
  const dispatch = useDispatch();
  dispatch(reservationActions.getSelectedType(null));
  dispatch(reservationActions.getReservationItem(null));
  dispatch(
    reservationActions.getOpeningHours([
      +place.placeMainInfo.placeOpenTime.slice(0, 2),
      +place.placeMainInfo.placeCloseTime.slice(0, 2),
    ])
  );
  return (
    <Wrapper>
      <Head>
        <title>Place Sharing-{place.placeMainInfo.placeName}</title>
        <meta
          name="description"
          content={`공간 대여 플랫폼,${place.placeMainInfo.placeName}`}
        />
      </Head>
      <PlaceInfo
        placeName={place.placeMainInfo.placeName}
        address={place.placeMainInfo.address}
        rating={place.placeMainInfo.ratePoint}
        review={place.placeMainInfo.reviewQuantity}
        main="true"
      />
      <PlaceMainImage images={place.placeMainInfo.placeImage} />
      <div className="line"></div>
      <section>
        <div className="info-left">
          <PlaceItemCount
            placeName={place.placeMainInfo.placeName}
            itemCount={[
              place.placeMainInfo.deskQuantity,
              place.placeMainInfo.meetingRoomQuantity,
              place.placeMainInfo.officeQuantity,
            ]}
          />
          <PlaceDescription
            description={place.placeMainInfo.placeDescription}
          />
          <PlaceOpeningHours
            closedDays={place.placeMainInfo.placeCloseDays}
            openTime={place.placeMainInfo.placeOpenTime}
            closeTime={place.placeMainInfo.placeCloseTime}
            main={true}
          />
          <PlaceAdditional
            additionalItem={place.placeMainInfo.placeMainInfo}
            main={true}
          />
          <PlaceAround placeSubInfo={place.placeSubInfo} />
          <ItemListForm items={place.placeMainInfo.roomTypeResponse} />
        </div>
        <div className="info-right">
          <ReservationForm />
        </div>
        <div className="info-bottom">
          <Review
            rating={place.placeMainInfo.ratePoint}
            count={place.placeMainInfo.reviewQuantity}
            ratingList={place.placeMainInfo.ratingList}
          />
        </div>
      </section>
    </Wrapper>
  );
};

export async function getStaticProps(context) {
  const placeId = context.params.id;

  try {
    const response = await axios({
      url: `${process.env.baseURL}places/${placeId}`,
    });
    if (response.status === 200) {
      return {
        props: {
          place: response.data,
        },
        revalidate: 20,
      };
    } else {
      throw new Error(response.data);
    }
  } catch (error) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: '1' } },
      { params: { id: '2' } },
      { params: { id: '3' } },
    ],
    fallback: 'blocking',
  };
}

export default PlaceMainPage;
