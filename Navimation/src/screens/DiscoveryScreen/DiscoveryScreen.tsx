import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Image,
} from 'react-native';

import CourseModal from '../../components/courseModal/CourseModal';
import {backgroundColor} from '../../model/colors';
import Carousel from '../../components/carousel/Carousel';

const popularCourses = [
  'https://img.freepik.com/free-photo/beauty-portrait-female-face_93675-132045.jpg?size=626&ext=jpg&ga=GA1.1.2082370165.1710892800&semt=ais',
  'https://images.pexels.com/photos/4298629/pexels-photo-4298629.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.squarespace-cdn.com/content/v1/59962ced37c58197c0ae86f8/1503337875054-55GKXXJ6Z1U3MR5JMCLM/portrait-photography-tutorial-posing.jpg?format=500w',
  'https://www.worldphoto.org/sites/default/files/default-media/Piercy.jpg',
];

function FlatListComponent({
  image,
  pressHandler,
}: {
  image: string;
  pressHandler: () => void;
}) {
  return (
    <Pressable onPress={pressHandler}>
      <Image
        source={{uri: image}}
        style={{width: 150, height: 250, margin: 20}}
      />
    </Pressable>
  );
}

function DiscoveryScreen() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <ScrollView style={styles.container}>
      {isModalVisible && (
        <CourseModal
          id={1}
          isModalVisible={isModalVisible}
          handleModal={handleModal}
        />
      )}

      <View style={styles.container}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>TEST APPLICATION</Text>
        </View>
        <Carousel
          image={
            'https://imgv3.fotor.com/images/slider-image/Female-portrait-picture-enhanced-with-better-clarity-and-higher-quality-using-Fotors-free-online-AI-photo-enhancer.jpg'
          }
          bigText={'BODROGHY-SZABÓ DÉNES'}
          smallText={'PROFESSION'}
          pressHandler={handleModal}
        />

        <View style={styles.popularTextContainer}>
          <Text style={styles.popularText}>NÉPSZERŰ KURZUSOK</Text>
        </View>

        <View style={styles.popularContainer}>
          {popularCourses.map((item, index) => (
            <View key={index}>
              <FlatListComponent image={item} pressHandler={handleModal} />
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: backgroundColor},
  headerText: {
    color: 'white',
    textAlign: 'center',
    letterSpacing: 5,
    fontSize: 25,
    marginBottom: 10,
  },
  headerTextContainer: {marginTop: 75},
  popularTextContainer: {marginTop: 25},
  popularText: {
    color: 'white',
    textAlign: 'left',
    letterSpacing: 2,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
  },
  popularContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default DiscoveryScreen;
