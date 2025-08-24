import style from './ImageUploader.module.css';

import React from 'react';

interface MemoEditerProps {
  imageUrl?: string;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageUploader: React.FC<MemoEditerProps> = ({ imageUrl, handleImageUpload }) => {
  const hasImage = Boolean(imageUrl);
  return (
    <div
      className={hasImage ? style.imageUploader__full : style.imageUploader__empty}
      style={hasImage ? { backgroundImage: `url(${imageUrl})` } : {}}
    >
      <label
        className={style.imageUploader__button}
        style={{ backgroundColor: hasImage ? '#0F172A80' : 'var(--color-salte-200)' }}
      >
        <img
          className={style.imageUploader__icon}
          src={hasImage ? '/images/icons/edit_icon.svg' : '/images/icons/plus_bl_icon_sm.png'}
        />
        <input
          className={style.imageUploader__input}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />
      </label>
    </div>
  );
};

export default React.memo(ImageUploader);
