import { useState, useContext } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import i18n from '../../i18next.js';
import StatusContext from '../../context/index.js';

const ButtonsLng = () => {
  const {
    statusState,
    setRu,
    setEn,
    setSp,
  } = useContext(StatusContext);

  const activeButton = () => {
    const { lng } = statusState;
    if (lng === 'en') {
      return '2';
    }
    if (lng === 'sp') {
      return '3';
    }
    return '1';
  };

  const [radioValue, setRadioValue] = useState(activeButton());

  const radios = [
    { name: 'ru', value: '1' },
    { name: 'en', value: '2' },
    { name: 'sp', value: '3' },
  ];

  const handleLangSwitch = (num, name) => {
    setRadioValue(num);
    if (name === 'en') {
      setEn();
    }
    if (name === 'sp') {
      setSp();
    }
    if (name === 'ru') {
      setRu();
    }
    const { lng } = statusState;
    return i18n.changeLanguage(lng);
  };

  return (
    <ButtonGroup className="me-3">
      {radios.map((radio) => (
        <ToggleButton
          key={radio.value}
          id={`radio-${radio.value}`}
          type="radio"
          variant="outline-primary"
          name="radio"
          value={radio.value}
          checked={radioValue === radio.value}
          onChange={(e) => handleLangSwitch(e.currentTarget.value, radio.name)}
        >
          {radio.name}
        </ToggleButton>
      ))}
    </ButtonGroup>
  );
};

export default ButtonsLng;
