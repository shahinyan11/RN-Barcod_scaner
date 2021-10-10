import {Alert, AlertButton} from 'react-native';

export interface PopupParams {
  message: string;
  title?: string | null;
  positiveButtonText?: string;
  negativeButtonText?: string;
}

export default function showPopup(params: PopupParams) {
  let buttons: AlertButton[] = [];
  if (params.negativeButtonText) {
    buttons.push({
      text: params.negativeButtonText,
      onPress: () => {},
    });
  }
  buttons.push({
    text: params.positiveButtonText ?? 'Ok',
    onPress: () => {},
  });
  Alert.alert(params.title ?? '', params.message, buttons, {
    cancelable: false,
  });
}
