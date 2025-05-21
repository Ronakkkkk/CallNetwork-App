import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';
import Bigcoin from '../assets/svg/BigCoin.svg';
import MiniCoin from '../assets/svg/minicoin.svg';
import colors from '../config/color';
import Jangline from '../assets/svg/Jangline.svg';
import TetraxCoin from '../assets/svg/Tetraxcoin.svg';

interface RewardHeaderProps {
  name: string;
  callpoints: string;
}

const RewardHeader = ({
  name = 'Kash Danda',
  callpoints = '200',
}: RewardHeaderProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Jangline
          width={width}
          height={100}
          style={{position: 'absolute', top: 20}}
        />

        <View style={styles.textContainer}>
          <Text style={styles.nameText}>{name}</Text>
          <View style={styles.pointsContainer}>
            <MiniCoin width={24} height={24} style={styles.miniCoin} />
            <Text style={styles.pointsText}>Call Points: {callpoints}</Text>
          </View>
        </View>

        <View style={styles.coinContainer}>
          {/* TetraxCoin above BigCoin */}
          <TetraxCoin width={48} height={48} style={styles.topTetrax} />

          {/* Main BigCoin */}
          <Bigcoin width={150} height={150} style={styles.bigCoin} />

          {/* TetraxCoin below BigCoin */}
          <TetraxCoin width={48} height={48} style={styles.bottomTetrax} />
        </View>
      </View>
    </View>
  );
};

export default RewardHeader;

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    width: 'auto', // Change from '100%' to 'auto'
    backgroundColor: colors.purple,
    borderRadius: 20,
    marginHorizontal: 16, // Use marginHorizontal instead of separate left/right
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', // Changed back to center for original text alignment
    paddingBottom: 10,
    position: 'relative',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  nameText: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 12,
    letterSpacing: 0.3,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  miniCoin: {
    marginRight: 8,
  },
  pointsText: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.white,
  },
  coinContainer: {
    position: 'relative',
    width: 120,
    height: 140,
    alignSelf: 'flex-start', // Position at the top while keeping row centered
    marginTop: -15,
  },
  bigCoin: {
    position: 'absolute',
    bottom:20,
    right: -35,
  },
  topTetrax: {
    position: 'absolute',
      bottom: 110,
    right:80,
    zIndex: 2,
  },
  bottomTetrax: {
    position: 'absolute',
    bottom: 5,
    right: -15,
    zIndex: 2,
  },
});
