import React, {useRef, useState, useEffect, useCallback} from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import ContactDetails from './ContactDetails';
import ProfileImage from './ProfileImage';
import {Profile} from './types';

interface AvatarItem {
  item: Profile;
  index: number;
}

interface DetailsItem {
  item: Profile;
}


interface ViewabilityConfig {
  itemVisiblePercentThreshold: number;
}

interface scrollEvent {
  nativeEvent: {contentOffset: {x: number, y:number}};
}
const {contacts} = require('../../../local.json');
const {width} = Dimensions.get('window');
const factor = 8.6;

const ContactList: React.FC = () => {
  const avatarListRef = useRef<any>(null);
  const detailsListRef = useRef<any>(null);

  const [viewableItemIndex, setViewableItemIndex] = useState(0);

  const [blockedAvatarListScrolling, setBlockedAvatarListScrolling] =
    useState(false);
  const [blockedDetailsListScrolling, setBlockedDetailsListScrolling] =
    useState(false);

  const [selectedProfile, setSelectedProfile] = useState(contacts[0].name);

  const selectProfile = useCallback(
    (item: Profile, index: number): void => {
      detailsListRef?.current.scrollToIndex({animated: true, index: index});
      setSelectedProfile(item.name);
    },
    [contacts],
  );

  useEffect((): void => {
    setBlockedAvatarListScrolling(false);
    setBlockedDetailsListScrolling(false);
  }, [selectedProfile]);

  const renderAvatarItem = ({item, index}: AvatarItem): JSX.Element => (
    <TouchableOpacity onPress={() => selectProfile(item, index)}>
      <ProfileImage
        name={item.name}
        isSelected={selectedProfile === item.name ? true : false}
      />
    </TouchableOpacity>
  );

  const renderDetailsItem = ({item}: DetailsItem) => (
    <ContactDetails profileDetails={item} />
  );

  const onDetailsViewableItemsChanged = ({viewableItems}: any): void => {
    let index = viewableItems[0]?.index;
    setViewableItemIndex(index);
  };

  const onAvatarsViewableItemsChanged = ({viewableItems}: any): void => {
    let index = viewableItems[0]?.index;
    setViewableItemIndex(index);
  };

  const viewabilityConfig: ViewabilityConfig = {
    itemVisiblePercentThreshold: 100,
  };

  const unblockScrolling = (): void => {
    setBlockedAvatarListScrolling(false);
    setBlockedDetailsListScrolling(false);
  };

  const onAvatarListScroll = (e: scrollEvent) => {
    if (detailsListRef && !blockedDetailsListScrolling) {
      setBlockedAvatarListScrolling(true);
      detailsListRef.current.scrollToOffset({
        offset: e.nativeEvent.contentOffset.x * factor,
        animated: false,
      });
    }
  };

  const onAvatarListScrollEnd = () => {
    unblockScrolling();
    if (!blockedDetailsListScrolling) {
      viewableItemIndex > 0 &&
        viewableItemIndex <= contacts.length &&
        detailsListRef?.current.scrollToIndex({
          animated: true,
          index: viewableItemIndex,
        });
    }

    avatarListRef?.current?.props?.data[viewableItemIndex] &&
      setSelectedProfile(
        avatarListRef?.current?.props?.data[viewableItemIndex].name,
      );
  };

  const onDetailsListScroll = (e: scrollEvent) => {
    if (avatarListRef && !blockedAvatarListScrolling) {
      setBlockedDetailsListScrolling(true);
      avatarListRef.current.scrollToOffset({
        offset: (e.nativeEvent.contentOffset.y / factor),
        animated: false,
      });
    }
  };

  const onDetailsListScrollEnd = () => {
    unblockScrolling();
    avatarListRef?.current?.props?.data[viewableItemIndex] &&
      setSelectedProfile(
        avatarListRef?.current.props.data[viewableItemIndex].name,
      );
  };
  return (
    <View>
      <View>
        <FlatList
          ref={avatarListRef}
          contentContainerStyle={styles.avatarListContainer}
          numColumns={1}
          style={{paddingLeft: width / 2 - 45}}
          horizontal
          decelerationRate={'fast'}
          snapToInterval={88}
          snapToAlignment={'center'}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={contacts}
          renderItem={renderAvatarItem}
          keyExtractor={item => item.name + 'avatar'}
          viewabilityConfigCallbackPairs={
            useRef([
              {
                viewabilityConfig,
                onViewableItemsChanged: onAvatarsViewableItemsChanged,
              },
            ]).current
          }
          onScroll={onAvatarListScroll}
          onMomentumScrollEnd={onAvatarListScrollEnd}
        />
      </View>
      <View>
        <FlatList
          onScroll={onDetailsListScroll}
          ref={detailsListRef}
          decelerationRate={'fast'}
          snapToInterval={800}
          snapToAlignment={'start'}
          showsHorizontalScrollIndicator={false}
          data={contacts}
          renderItem={renderDetailsItem}
          keyExtractor={item => item.name + 'details'}
          viewabilityConfigCallbackPairs={
            useRef([
              {
                viewabilityConfig,
                onViewableItemsChanged: onDetailsViewableItemsChanged,
              },
            ]).current
          }
          onMomentumScrollEnd={onDetailsListScrollEnd}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  avatarListContainer: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ContactList;
