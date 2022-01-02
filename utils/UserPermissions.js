// import { Constants } from "expo-constants";
// import * as Permissions from 'expo-permissions';
// import * as MediaLibrary from 'expo-media-library';


// class UserPermissions {
//   getCameraPermission = async (photo) => {
//     const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
//     if (status === 'granted') {
//       const assert = await MediaLibrary.createAssetAsync(photo);
//       MediaLibrary.createAlbumAsync('Avatars', assert);
//     } else {
//       alert('We need permission to use your Camera Roll');
//     }
//   }
// }

// export default new UserPermissions();