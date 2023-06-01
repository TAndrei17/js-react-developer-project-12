import { useState } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import i18n from '../../i18next.js';

function ButtonsLng() {
  const [radioValue, setRadioValue] = useState('1');

  const radios = [
    { name: 'ru', value: '1' },
    { name: 'en', value: '2' },
    { name: 'sp', value: '3' },
  ];

  const handleLangSwitch = (num, name) => {
    setRadioValue(num);
    i18n.changeLanguage(name);
  };

  return (
    <>
      <ButtonGroup className="me-3">
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant="outline-primary"
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={(e) =>
              handleLangSwitch(e.currentTarget.value, radio.name)
            }>
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
    </>
  );
}

export default ButtonsLng;
