import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { officeSliceActions } from '../../../store/officeList';

const PlaceMarker = (props) => {
  const dispatch = useDispatch();
  const officeList = useSelector((state) => state.officeList.filteredPlaceList);
  const markers = useSelector((state) => state.officeList.marker);
  const { map } = props;

  const setMapCenterPosition = (e) => {
    if (e.target.classList[0] === 'customOverlay') {
      const selectedPlaceId = e.target.id;
      dispatch(officeSliceActions.selectPlace(selectedPlaceId));
      const selectedPlace = officeList.filter(
        (elem) => elem.key === selectedPlaceId
      );
      const selectedPlaceAddress = selectedPlace[0].item.address;
      const geocoder = new kakao.maps.services.Geocoder();

      geocoder.addressSearch(selectedPlaceAddress, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
          map.current.setLevel(4);
          map.current.panTo(coords);
        }
      });
    } else {
      return;
    }
  };
  const setBound = (bounds) => {
    map.current.setBounds(bounds);
  };
  useEffect(() => {
    markers.map((elem) => elem.setMap(null));
    const bounds = new kakao.maps.LatLngBounds();
    officeList.map((elem) => {
      const content = document.createElement('div');
      content.classList.add('wrap');
      content.setAttribute('id', elem.key);
      let customOverlay = document.createElement('div');
      customOverlay.classList.add('customOverlay');
      customOverlay.setAttribute('id', elem.key);
      customOverlay.textContent = elem.item.placeName;
      let arrow = document.createElement('div');
      arrow.setAttribute('id', elem.key);
      arrow.classList.add('arrow');
      content.appendChild(customOverlay);
      content.appendChild(arrow);
      content.addEventListener('click', setMapCenterPosition);
      const geocoder = new kakao.maps.services.Geocoder();
      geocoder.addressSearch(elem.item.address, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
          const overlay = new kakao.maps.CustomOverlay({
            content,
            map: map.current,
            position: coords,
          });
          bounds.extend(coords);
          dispatch(officeSliceActions.getOverlay(overlay));
          setBound(bounds);

          return overlay;
        }
      });
    });
  }, [officeList]);
};

export default PlaceMarker;
