import React from 'react';
import {Linking, Alert, TouchableOpacity} from 'react-native';

const LinkComponent = ({
  children,
  goToURL,
}: {
  children: JSX.Element;
  goToURL: string;
}) => {
  const handleLinking = () => {
    Linking.openURL(goToURL)
      .then(value => console.info(value))
      .catch(reason => {
        Alert.alert("Can't open specified URL, try again!", reason);
      });
  };
  return (
    <TouchableOpacity onPress={() => handleLinking()}>
      {children}
    </TouchableOpacity>
  );
};

export default LinkComponent;
