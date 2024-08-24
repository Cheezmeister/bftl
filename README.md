
# Brendan's Freaking Task List
[![SemaphoreCI Status](https://cheezmeister.semaphoreci.com/badges/bftl/branches/master.svg)][semaphoreci]
[![GitHub Status](https://github.com/cheezmeister/bftl/actions/workflows/node.js.yml/badge.svg)][workflows]

[workflows]: https://github.com/Cheezmeister/bftl/actions/workflows/node.js.yml
[semaphoreci]: https://cheezmeister.semaphoreci.com/projects/bftl

A happy little task list. Spiritual successor to https://github.com/cheezmeister/fantaskulous and https://github.com/cheezmeister/fkls

## Notes to Self

Here are the things I needed to do on macos to get started. Devenv setup first happened circa September 2023.

```console
cd /Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX.sdk/System/Library/Frameworks/Ruby.framework/Versions/2.6/usr/include/ruby-2.6.0
sudo ln -sf ../../../../Headers/ruby/config.h
sudo ln -sf universal-darwin23 universal-darwin22
```

See: https://stackoverflow.com/a/65481787/118220

## TODO


- [ ] Stop using this list, and dogfood instead
- [ ] Fix CI
- [ ] Fill in REQUIREMENTS.md
- [ ] Evaluate https://emotion.sh/docs/install
- [ ] Evaluate https://github.com/jonathanpalma/react-native-tesseract-ocr
- [ ] Implement "create blocker"
- [ ] Implement edit existing tasks
- [ ] Parse #project and @contexts
- [ ] Test on device
- [ ] Deploy to device
- [x] Implement "done"
- [x] Implement change priority
- [x] Implement sort by priority
- [x] Pull in sample tasks

---

<details> 

   This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native. Use `npm start`

## Step 2: Start your Application

Press `i` or `a` as prompted by Metro to run an iOS or Android emulator.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.

</details>
