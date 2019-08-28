# DESCRIPTION
This labeling (<abbr title="Optical Character Recognition">OCR</abbr>-pending) app attempts to:
- Capture images with a simple camera components built with [React Native](https://facebook.github.io/react-native/docs/getting-started) from within [Android Studio](https://developer.android.com/studio/install) .
- Extract food products from an immage (or receipt) with [Google Cloud Vision API](https://cloud.google.com/vision/) from a [Node.js] server deployed using the [Google App Engine]() via the [Google Cloud <abbr title="software development kit">SDK</abbr>](https://cloud.google.com/sdk/docs/).
- Use the resulting labels provided by the Vision API to search for the products' nutritional value with an API like _[Edamam](https://developer.edamam.com)_.
- Graph accumulated total for a given interval of time with a graphing API like __.

Configurations are for a Windows machine with a <abbr title="Windows Subsystem for Linux">WSL</abbr>, which is an important note during the [Watchman installation](#install-watchman).

# REACT NATIVE (ANDROID FRONT-END CLIENT)
[React Native](https://facebook.github.io/react-native/docs/getting-started) is to a mobile device's native code as React is to a browser's <abbr title="Document Object Model">DOM</abbr>.

React Native will need *Node.js*, [Android Studio](#install-android-studio), [JDK](#install-jdk), and the [React Native CLI](#install-react-native-cli).

## Install JDK
The <abbr title="Java SE Development Kit">JDK</abbr> will need to be installed for developing Java programs, either personally or via Android Studio's wizard. If one is not already available, you could either let the Android Studio wizard guide you or intall one with:

```powershell
choco install -y jdk8
```
and/or 
```bash
sudo apt-get install openjdk-8-jdk
```

### Verify JAVA Environment Variable 
Locate the address for the JDK, and verify the addition of the **JAVA_HOME** environment variable with default address: 
```
C:\Program Files\Java\jdk1.8.0_221
```

Also, verify or append the new path: 
```
C:\Program Files\Java\jdk1.8.0_221\bin
```

> [Warning]: Installing Android Studio in Windows will not automatically make it available in WSL. Install in WSL.  

To make this variable available in WSL add it to the `.bashrc` file at the root directory and append the `$PATH`.

```bash
#In my case, with WSL, the JDK path exist on Windows' C drive which WSL has mounted as c
export JAVA_HOME=/mnt/c/Program\ Files/Java/jdk1.8.0_221
export PATH=$PATH:$JAVA_HOME/bin
```
> [ERROR]: JAVA_HOME is said to be set to an invalid directory during run of `react-native run-android`.

## Install Android Studio
Install [Android Studio](https://developer.android.com/studio/install) locally and used the wizard to configure the *JDK* or [configure](https://developer.android.com/studio/intro/studio-config#customize_vm) it manually.

Android Native will set up the necessary tooling to **build** a React Native app for Android.

Make sure all of the following are checked during installation:

- Android SDK
- Android SDK Platform
- Android Virtual Device

> [Warning]: Installing Android Studio in Windows will not automatically make it available in WSL. Install in WSL.  

### Configure Android SDK in Android Studio
To run React Native, use the Android SDK **Android 9 (Pie)**. Set this configuration with Android Studio's SDK Manager accessed via: 
1) the Configure tab in the welcome window (viewable when all projects have been closed) *or*
2) Preferences > Dialog > Appearance&Behavior > System Settings > Android SDK

#### Select the Android SDK Platform
In the SDK Manager's *SDK Platforms* tab, check the *Show Package Details* option and expand **Android 9** to include: 
- Android SDK Platform 28
- Intel x86 Atom_64 System Image **or** Google APIs Intel x86 Atom System Image

#### Select the Android SDK Build-Tools
In the SDK Manager's *SDK Tools* tab, check the *Show Package Details* option and expand the **Android SDK Build-Tools** to include: 
- 28.0.3 

#### Configure Shell-Specific Environment Variables 
In the Android Studio's SDK Manager, find and copy the path to the Android SDK. Set an **`ANDROID_HOME`** environment variable to the Android SDK path and update the **`PATH`** to include the `/platform-tools` directory.

On Windows, use the *Environment Variables* window to create a new `ANDROID_HOME` variable:
```
C:\Users\Hugo\AppData\Local\Android\Sdk
```
Also, append the path with:
```
C:\Users\%USERNAME%\AppData\Local\Android\Sdk\platform-tools
``` 

Append the **`$PATH`** environmental variable with the location of  by appending the shell's config file (i.e., `.bashrc` for bash) in the root directory. On WSL, set equal to the Android SDK's path, which is used to append the `/emulator`, `/tools`, `/tools/bin`, and `/platform-tools ` directories:

```bash
#export ANDROID_HOME=$HOME/Android/Sdk
#In my case, with WSL, the Android SDK path exist on Windows' C drive which WSL has mounted as c
export ANDROID_HOME=/mnt/c/Users/$WINDOWS_USERNAME/AppData/Local/Android/Sdk 
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

Verify the `$PATH` was appended by running: 

```bash
echo $PATH
```

## Install React Native CLI
To install React Native globally, run the following command:

```bash
npm install -g react-native-cli
```

Alternatively, install the Expo CLI.

### Expo
[Expo](https://expo.io/learn) is to React Native as [Create React App](https://create-react-app.dev/docs/getting-started) is to React. Expo can create both a server and a React Native project template.

To install it, run:

```bash
npm install -g expo-cli
```

> [Note]: For unsupported functionality, the Expo-created project may need to be ['ejected'](https://facebook.github.io/react-native/docs/getting-started) and the `react-native-cli` used instead of `expo`.

## Install Watchman
[Watchman](https://facebook.github.io/watchman) is similar to [Nodemon](https://www.npmjs.com/package/nodemon) in that Watchman will *watch* for changes in the filesystem and rerun a build.

In order to avoid the [build install](https://facebook.github.io/watchman/docs/install.html#buildinstall) as well as the installation of Homebrew in WSL just to [install Watchman](https://facebook.github.io/watchman/docs/install.html#installing-on-os-x-via-homebrew) . [Download](https://facebook.github.io/watchman/docs/install.html#download-for-windows-beta) and extract/unzip the `/watchman` directory into
`C:\Users\USERNAME\AppData\Local\watchman` so that it is accessible with:

```bash
/mnt/c/Users/USERNAME/AppData/Local/watchman
```

Add the directory to **`$PATH`** like we did [previously](#configure-shell-specific-environment-variables) to our `.bashrc` file:

```bash
#attempt to use windows version of Watchman Beta
export WATCHMAN_HOME=/mnt/c/Users/Hugo/AppData/Local/watchman
export PATH=$PATH:$WATCHMAN_HOME
```

You can check that it was added correctly with: 

```bash
echo $path
watchman.exe -v #it's an executable
```

## Create the React Native Project
Create a project by running `react-native init` with the name of the project called, for example:

```bash
react-native init whatweate
```

>[Note]: Third-party CLIs such as [Ignite CLI](https://github.com/infinitered/ignite) can also init your React Native app with additional boilerplate code.


# Running a React Native Apps
Both [physcal devices](https://facebook.github.io/react-native/docs/running-on-device) and [Android Virtual Devices (AVD)](https://developer.android.com/studio/run/managing-avds.html) simulated in the **Android Emulator** can be used to run React Native Apps.

## Enable Debugging of React Native App over  USB on Phone 
[On a phone](https://facebook.github.io/react-native/docs/running-on-device) used for developing the app, enable the *Developer* options menu by going to *Settings* > *About phone* and tapping the *Build number* seven times. 

Go back to *Settings*, search for *Developer options*, and enable *USB debugging*.

Then change the *Settings* > *Default USB configuration* (under *Networking*) to <abbr title="Precision Time Protocol">PTP*</abbr>.

Plugin USB and connect to the <abbr title="Android Debug Bridge">ADB</abbr> found in the `$ANDROID_HOME/platform-tools`.

```bash
adb.exe devices
```
>[Caution]: Pixel 2XL failed to connect...moved to AVD.

## Create an AVD
Create <abbr title="Android Virtual Device">AVD</abbr> by opening the **AVD Manager** from Android Studio, picking a device, and selecting the *Pie API Level 28* image.

## Start the AVD
Click the play button next to a device on the AVD Manager.

## Running the App
After starting an AVD (or successfully connecting a physical device) that appears when `adb.exe devices` is run, start the build and server (which can also run with `react-native start`) in the project's root directory:

```bash
react-native run-android # inside '\whatweate`
```

## Similarities to React Components
React Native components are to the native componets as React components are to web components.

React Native Component | React Component
:-:|:-:
`<View>` | `<div>` or `<span>`
`<Text>`(required for all text) | `<p>`
`<Image source={{uri:''}}/>` | `<img src={''}/>`
`<TextInput value={} onChangeText={()=>{}}/>` | `<input type='text' value={{} onChange={()=>{}}/>`
`<Button title='' onPress={cb}/>`|`<button onClick={}>''</>`

Props, state, and life-cycle hooks work the same as in React.

## Similarties to CSS [Styles](https://facebook.github.io/react-native/docs/text)
The `StyleSheet` component's `.create({})` method,  takes an object of key-value pairs, where each value is also an object similar to those used by CSS
selectors, except camelCased.

To style sub-components, create a `const styles = StyleSheet.create()` in a component with sub-components, and add the prop `style={[styles.key1, styles.key2, ...]}` to the sub-component.

### Touchables
Beside the *Button* component, `TouchableHighlight`, `TouchableNativeFeedback`, `TouchableOpacity` are also [options](https://facebook.github.io/react-native/docs/handling-touches).

# React Native Packages
## React-Native-Image-Picker
Download and install the simple camera and image picker called [react-native-image-picker](https://github.com/react-native-community/react-native-image-picker).

```bash
npm i react-native-image-picker
react-native link react-native-image-picker
```

## Add Permissions
In the `/android/app/src/main/AndroidManifest.xml` file, add the camera [permission](https://developer.android.com/training/permissions/usage-notes) required for react-native-image-picker to use the camera and save.

```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
```
