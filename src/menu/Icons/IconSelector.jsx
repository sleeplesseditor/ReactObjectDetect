import React from 'react';

import { ReactComponent as ArrowIcon } from './arrow.svg';
import { ReactComponent as FaceIcon } from './face.svg';
import { ReactComponent as ImageIcon } from './image.svg';
import { ReactComponent as ObjectIcon } from './object.svg';
import { ReactComponent as SignIcon } from './sign.svg';

const getIcon = (icon) => {
  const iconSelection = {
      arrowIcon: () => <ArrowIcon/>,
      faceIcon: () => <FaceIcon/>,
      imageIcon: () => <ImageIcon/>,
      objectIcon: () => <ObjectIcon/>,
      signIcon: () => <SignIcon/>,
      default: () => null
  }

  return (iconSelection[icon] || iconSelection.default)()
}

export const IconSelector = (icon) => {
    const iconClass = getIcon(icon);
    return (
      <>
        {iconClass}
      </>
    );
};