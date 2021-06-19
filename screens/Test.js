import React, { useEffect, useReducer, useState } from 'react';
import { Alert, BackHandler, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View, Modal } from 'react-native';
import CountDown from 'react-native-countdown-component';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AnswerItem from '../components/AnswerItem';
import NumberItem from '../components/NumberItem';
import QuestionText from '../components/QuestionText';
import { colors } from '../utils/colors';
import { questions } from '../utils/exams';

const Test = ({ route, navigation }) => {
  // Get question list from exam name
  const { abbr, fullname, userAnswers, isReview } = route.params;
  const map = new Map();
  if (userAnswers) {
    const a = JSON.parse(userAnswers);

    for (const x in a) {
      map.set(x, a[x]);
    }
  }


  const questionList = questions[abbr];
  const [modalVisible, setModalVisible] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentID, setCurrentID] = useState(questionList[0]['_id']);
  const [userAnswerList, setUserAnswerList] = useState(!userAnswers ? new Map() : map);
  const [answerChecked, setAnswerChecked] = useState();

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      const prevID = questionList[currentIndex - 1]['_id'];
      setCurrentID(prevID);

      const prevCheck = userAnswerList.get(prevID);
      setAnswerChecked(prevCheck ? prevCheck : null);

    }
  }

  const next = () => {
    if (currentIndex < questionList.length - 1) {
      setCurrentIndex(currentIndex + 1);
      const nextID = questionList[currentIndex + 1]['_id'];
      setCurrentID(nextID);

      const nextCheck = userAnswerList.get(nextID);
      setAnswerChecked(nextCheck ? nextCheck : null);

    }
  }

  const stopQuiz = () => {
    Alert.alert('Oops', 'Wanna quit the test? Your progess won\'t be saved.', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      { text: 'Quit', onPress: () => navigation.popToTop() },
    ]);
    return true;
  }

  const submit = () => {


    let score = 0;

    for (let [key, value] of userAnswerList) {
      console.log(`${key} - ${value}`);
      for (const question of questionList) {

        if (key == question._id && value == question.correctAnswer) {
          // console.log(question);
          score++;
        }
      }
    }

    let scoreText = null;
    if (score < 10) {
      scoreText = "Practice more to improve it :D";
    }
    if (score <= 13 && score >= 10) {
      scoreText = "Good, keep up!";
    }
    if (score >= 14 && score <= 16) {
      scoreText = "Good, keep up!";
    }
    if (score > 16) {
      scoreText = "Perfect!!";
    }







    navigation.navigate('Result', {
      abbr: abbr,
      fullname: fullname,
      score: score,
      scoreText: scoreText,
      userAnswers: JSON.stringify(Object.fromEntries(userAnswerList))
      // userAnswers: JSON.stringify(userAnswerList);
    });




  }


  const onAnswerPress = (key) => {
    setAnswerChecked(key);
    setUserAnswerList((prev) => new Map(prev).set(currentID, key));

  }

  useEffect(() => {
    setAnswerChecked(userAnswerList.get(currentID));
    console.log(userAnswerList);
  }, [answerChecked, userAnswerList])



  // handle hardware back button
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', stopQuiz);
    return () => backHandler.remove();
  }, []);





  // RENDERING

  return (
    <View style={styles.container}>



      {isReview == true ?
        <View style={[styles.row, { justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }]}>
          <TouchableOpacity
            styles={styles.button}
            onPress={() => navigation.popToTop()}>
            <View style={styles.button}>
              <FontAwesome name='home' size={15} color='white' />
            </View>
          </TouchableOpacity>


          <View style={styles.timerContainer}>
            <Text style={{ color: 'white', fontFamily: 'Montserrat-Bold' }}>Review mode</Text>
          </View>


          <TouchableOpacity
            styles={styles.button}
            onPress={() => {
              setModalVisible(true);
            }}>
            <View style={styles.button}>
              <FontAwesome name='bars' size={15} color='white' />
            </View>
          </TouchableOpacity>

        </View>
        :
        <View style={[styles.row, { justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }]}>

          <TouchableOpacity
            styles={styles.button}
            onPress={stopQuiz}>
            <View style={styles.button}>
              <FontAwesome name='times' size={15} color='white' />
            </View>
          </TouchableOpacity>

          <View style={styles.timerContainer}>
            {/* <FontAwesome5 name='stopwatch' size={20} color='white' /> */}
            <CountDown
              until={60 * 25}
              size={25}
              onFinish={() => alert('Finished')}
              digitStyle={{ backgroundColor: '#FFFfff00' }}
              digitTxtStyle={{ color: 'white', }}
              timeToShow={['M', 'S']}
              timeLabels={{ m: '', s: '' }}
              onFinish={() => submit()}
              showSeparator
              separatorStyle={{ color: '#fff' }}
            />
          </View>
          <TouchableOpacity
            styles={styles.button}
            onPress={() => {
              Alert.alert('Wow', 'Wanna submit the test?', [
                {
                  text: 'Cancel',
                  onPress: () => null,
                  style: 'cancel',
                },
                {
                  text: 'Submit', onPress: () => submit()
                }]);
            }}>
            <View style={styles.button}>
              <FontAwesome name='paper-plane' size={15} color='white' />
            </View>
          </TouchableOpacity>
        </View>

      }




      {/* 
if (key === parseInt(correctAnswers[qID]) && parseInt(answers[qID]) === key) {
        div.classList.add('correct-green');
    }
    if (key === parseInt(correctAnswers[qID]) && parseInt(answers[qID]) !== key) {
        div.classList.add('correct-gray');
    }
    if (parseInt(correctAnswers[qID]) !== parseInt(answers[qID]) && parseInt(answers[qID]) === key) {
        div.classList.add('wrong');
    } */}







      {/* <Text>{currentID}</Text> */}



      {/* Questions area */}
      <ScrollView >


        {/* QUESTION TEXT */}
        <QuestionText text={questionList[currentIndex].text} />

        {/* 4 ANSWERS */}
        <View>
          {questionList[currentIndex].answers.map((answer, key) => {
            return (



              <AnswerItem
                key={key}
                keyProp={key}
                answer={answer}
                answerChecked={answerChecked}
                onAnswerPress={onAnswerPress}
                disabled={isReview}
                isCorrectAnswerChosen={isReview == true && questionList[currentIndex].correctAnswer == key && userAnswerList.get(currentID) == key}
                isWrongAnswerChosen={isReview == true && questionList[currentIndex].correctAnswer != key && userAnswerList.get(currentID) == key}


              />
            );
          })}

        </View>


      </ScrollView>

      {/* Bottom navbar */}

      <View style={[styles.row,
      {
        justifyContent: 'space-between',
        // position: 'absolute',
        bottom: 0,
        paddingTop: 10

      }]}>
        <TouchableOpacity
          styles={styles.button}
          onPress={prev}
          disabled={currentIndex == 0}
        >
          <View style={styles.button}>
            <FontAwesome name='arrow-left' size={15} color='white' />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={isReview == true ? null : () => {

            setModalVisible(true);
          }}

        >
          <View>
            <Text style={styles.statusBarText}>{currentIndex + 1} / 20</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          styles={styles.button}
          onPress={next}
          disabled={currentIndex == 19}

        >
          <View style={styles.button}>
            <FontAwesome name='arrow-right' size={15} color='white' />
          </View>
        </TouchableOpacity>



      </View>


      {/* Question list */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={[styles.container, { backgroundColor: 'rgba(0,0,0,.8)', padding: 0 }]}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Question List</Text>


              <FlatList data={questionList} numColumns={4} keyExtractor={(item) => item._id} renderItem={({ item }) => (

                <NumberItem
                  number={questionList.indexOf(item) + 1}
                  isAnswered={userAnswerList.get(item._id) != null}
                  isCorrect={isReview == true && userAnswerList.get(item._id) != null && userAnswerList.get(item._id) == item.correctAnswer}
                  isWrong={isReview == true && userAnswerList.get(item._id) != null && userAnswerList.get(item._id) != item.correctAnswer}


                  pressHandler={() => {

                    setModalVisible(!modalVisible);
                    setCurrentIndex(questionList.indexOf(item));
                    setCurrentID(item._id);
                    setAnswerChecked(userAnswerList.get(item._id));

                  }}


                />

              )} />
              {/* {questionList.map((option, key) => (
                
              ))} */}



              <TouchableOpacity
                style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}>
                <Text style={styles.textStyle}>Hide</Text>
              </TouchableOpacity>



            </View>
          </View>
        </View>
      </Modal>

    </View>
  )
}





export default Test

const styles = StyleSheet.create({

  container: {
    height: '100%',
    flexDirection: 'column',
    padding: 20,
    paddingTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary_pink

  },
  button: {
    width: 40,
    height: 40,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.secondary_dark_blue,
    borderRadius: 100
  },

  row: {

    backgroundColor: colors.primary_pink,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },

  statusBarText: {
    fontFamily: 'Montserrat-Bold',
    color: colors.secondary_dark_blue,
    fontSize: 16
  },
  timerContainer: {
    backgroundColor: colors.secondary_dark_blue,
    height: 50,
    padding: 10,
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20
  },
  timerText: {
    color: 'white',
    fontFamily: 'Montserrat-Bold',
    marginLeft: 10

  },


  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  modalView: {
    margin: 10,
    marginBottom: 60,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    color: colors.secondary_dark_blue
  },


})
