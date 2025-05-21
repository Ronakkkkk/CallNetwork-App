import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Circle from '../assets/svg/circle.svg';
import {Image} from 'react-native';
import colors from '../config/color';

const Progressbar = ({currentPoints = 500, maxPoints = 2000}) => {
  // Calculate progress percentage (capped at 100%)
  const progress = Math.min((currentPoints / maxPoints) * 100, 100);

  return (
    <View style={styles.container}>
      {/* Progress bar with milestone markers */}
      <View style={styles.progressBarContainer}>
        {/* The actual progress bar */}
        <View style={styles.trackBar}>
          <View style={[styles.progressBar, {width: `${progress}%`}]} />
        </View>

        {/* Milestone markers */}
        <View style={styles.milestonesContainer}>
          {/* Zero milestone (invisible but occupies space) */}
          <View style={[styles.milestone, styles.invisibleMilestone]}>
            <View style={[styles.circleBackground, styles.invisibleCircle]} />
            <Text style={styles.invisibleText}>0</Text>
          </View>

          {/* First milestone (unlocked if currentPoints >= 500) */}
          <View style={styles.milestone}>
            <View
              style={[
                styles.circleBackground,
                currentPoints >= 500
                  ? styles.activeCircle
                  : styles.lockedCircle,
              ]}>
              {currentPoints >= 500 ? (
                <Circle width={20} height={20} />
              ) : (
                <Image
                  source={require('../assets/images/lock.png')}
                  style={{width: 14, height: 14}}
                />
              )}
            </View>
            <Text
              style={
                currentPoints >= 500
                  ? styles.milestoneValueActive
                  : styles.milestoneValue
              }>
              500
            </Text>
          </View>

          {/* Rest of your milestones remain unchanged */}
          {/* Second milestone (locked) */}
          <TouchableOpacity style={styles.milestone}>
            <View
              style={[
                styles.circleBackground,
                currentPoints >= 1000
                  ? styles.activeCircle
                  : styles.lockedCircle,
              ]}>
              {currentPoints >= 1000 ? (
                <Circle width={20} height={20} />
              ) : (
                <Image
                  source={require('../assets/images/lock.png')}
                  style={{width: 14, height: 14}}
                />
              )}
            </View>
            <Text
              style={
                currentPoints >= 1000
                  ? styles.milestoneValueActive
                  : styles.milestoneValue
              }>
              1000
            </Text>
          </TouchableOpacity>

          {/* Third milestone (locked) */}
          <TouchableOpacity style={styles.milestone}>
            <View
              style={[
                styles.circleBackground,
                currentPoints >= 1500
                  ? styles.activeCircle
                  : styles.lockedCircle,
              ]}>
              {currentPoints >= 1500 ? (
                <Circle width={20} height={20} />
              ) : (
                <Image
                  source={require('../assets/images/lock.png')}
                  style={{width: 14, height: 14}}
                />
              )}
            </View>
            <Text
              style={
                currentPoints >= 1500
                  ? styles.milestoneValueActive
                  : styles.milestoneValue
              }>
              1500
            </Text>
          </TouchableOpacity>

          {/* Fourth milestone (locked) */}
          <TouchableOpacity style={styles.milestone}>
            <View
              style={[
                styles.circleBackground,
                currentPoints >= 2000
                  ? styles.activeCircle
                  : styles.lockedCircle,
              ]}>
              {currentPoints >= 2000 ? (
                <Circle width={20} height={20} />
              ) : (
                <Image
                  source={require('../assets/images/lock.png')}
                  style={{width: 14, height: 14}}
                />
              )}
            </View>
            <Text
              style={
                currentPoints >= 2000
                  ? styles.milestoneValueActive
                  : styles.milestoneValue
              }>
              2000
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Progressbar;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  progressBarContainer: {
    width: '100%',
    height: 80,
    position: 'relative',
  },
  trackBar: {
    width: '100%',
    height: 20,
    backgroundColor: '#512689',
    borderRadius: 10,
    position: 'absolute',
    top: 24, // Position the track bar
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.purple || '#9747FF',
    borderRadius: 10,
  },
  milestonesContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 5,
  },
  milestone: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  invisibleMilestone: {
    // Same dimensions as regular milestones, but invisible
    opacity: 0,
  },
  circleBackground: {
    width: 20, // Match the size of the progress bar height
    height: 20, // Match the size of the progress bar height
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', // Position absolutely
    top: 24, // Same as trackBar top position
    zIndex: 10,
  },
  invisibleCircle: {
    // Takes up space but is completely transparent
    backgroundColor: 'transparent',
  },
  invisibleText: {
    position: 'absolute',
    top: 50,
    color: 'transparent',
    fontSize: 14,
  },
  activeCircle: {
    backgroundColor: colors.purple || '#9747FF',
  },
  lockedCircle: {
    backgroundColor: '#7948b8',
  },
  milestoneValue: {
    position: 'absolute',
    top: 50, // Position below the track bar
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.5)',
    fontWeight: '600',
  },
  milestoneValueActive: {
    position: 'absolute',
    top: 50, // Position below the track bar
    fontSize: 14,
    color: 'white',
    fontWeight: '600',
  },
});
