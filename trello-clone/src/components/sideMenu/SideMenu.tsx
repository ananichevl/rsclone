import { Drawer } from 'antd';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import colors from '../../utils/colors/colors';
import images from '../../utils/img/images';

interface ISideMenuProps {
  visibleProp: boolean;
}

const SideMenu: React.FC<ISideMenuProps> = ({ visibleProp }) => {
  const { t } = useTranslation();
  const [openColorOption, setOpenColorOption] = useState(false);
  const [openImageOption, setOpenImageOption] = useState(false);

  const [visible, setVisible] = useState<boolean>(visibleProp);

  useEffect(() => {
    setVisible(visibleProp);
  }, [visibleProp]);

  const onClose = () => {
    setVisible(false);
    setOpenImageOption(false);
    setOpenColorOption(false);
  };

  const openColorOptions = () => {
    setOpenColorOption(true);
    setOpenImageOption(false);
  };

  const openImageOptions = () => {
    setOpenImageOption(true);
    setOpenColorOption(false);
  };

  return (
    <>
      <Drawer
        title={t('change_background')}
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
        width="400px"
      >
        <div className="bgMenuContainer">
          <div
            role="button"
            onKeyUp={(e) => console.log(e)}
            tabIndex={0}
            className="bgMenuItem"
            style={{ backgroundImage: 'url(https://images.pexels.com/photos/4173624/pexels-photo-4173624.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)' }}
            onClick={openImageOptions}
          >
            <span>photos</span>
          </div>
          <div
            role="button"
            onKeyUp={(e) => console.log(e)}
            tabIndex={0}
            className="bgMenuItem"
            style={{ backgroundImage: 'url(https://images.pexels.com/photos/226589/pexels-photo-226589.jpeg?cs=srgb&dl=closeup-photo-of-multi-color-stick-226589.jpg&fm=jpg)' }}
            onClick={openColorOptions}
          >
            <span>colors</span>
          </div>
        </div>
        <div className="bgMenuContainer" style={{ display: openImageOption ? 'flex' : 'none', outline: 'none' }}>
          {images.map((image) => (
            <div
              role="button"
              onKeyUp={(e) => console.log(e)}
              tabIndex={0}
              className="bgItem"
              onClick={() => console.log(image)}
              style={{ backgroundImage: image }}
            >
              <span />
            </div>
          ))}
        </div>
        <div className="bgMenuContainer" style={{ display: openColorOption ? 'flex' : 'none', outline: 'none' }}>
          {colors.map((color) => (
            <div
              role="button"
              onKeyUp={(e) => console.log(e)}
              tabIndex={0}
              className="bgItem"
              onClick={() => console.log(color)}
              style={{ backgroundColor: color }}
            >
              <span />
            </div>
          ))}
        </div>
      </Drawer>
    </>
  );
};

export default SideMenu;
