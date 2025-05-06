import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PagerView from 'react-native-pager-view';
import Onbo1 from './img/onbo1.svg';
import Onbo2 from './img/onbo2.svg';
import Onbo3 from './img/onbo3.svg';

import {OnboardingButton} from './Components';

export default function OnboardingScreen({
  completeOnboarding,
}: {
  completeOnboarding: () => void;
}) {
  const pages = [
    {
      icon: <Onbo1 />,
      title: <>Your Trusted Identity, Powered {'\n'} by Blockchain.</>,
      description: (
        <>
          Experience secure, decentralized caller {'\n'} identification with
          blockchain technology.
        </>
      ),
    },
    {
      icon: <Onbo2 />,
      title: <>Get rewards for identifying {'\n'} spam.</>,
      description:
        'Help the community by identifying spam callers and messages.',
    },
    {
      icon: <Onbo3 />,
      title: <>You Are Important So Is {'\n'} Your Data</>,
      description:
        'Block unwanted calls and enjoy a seamless calling experience.',
    },
  ];
  return (
    <>
      <PagerView initialPage={0} style={styles.pagerView}>
        {pages.map((page, i) => {
          return (
            <View style={styles.view} key={i.toString()}>
              {page.icon}
              <Text style={styles.onboardingTitle}>{page.title}</Text>
              <Text style={styles.onboardingDescription}>
                {page.description}
              </Text>
            </View>
          );
        })}
      </PagerView>
      <OnboardingButton text={'Get Started'} onPress={completeOnboarding} />
    </>
  );
}

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
  },
  view: {alignItems: 'center', justifyContent: 'center', padding: 40},
  onboardingTitle: {
    fontFamily: 'PoppinsSemiBold',
    fontSize: 24,
    lineHeight: 28,
    fontWeight: 700,
    textAlign: 'center',
  },
  onboardingDescription: {
    fontFamily: 'PoppinsRegular',
    // fontSize: 24,
    // lineHeight: 28,
    // fontWeight: 700,
    textAlign: 'center',
    marginTop: 24,
  },
});
