'use strict';


angular.module('thisvsthatApp')
  .constant('QUEST', 'questions')
  .factory('dbConfig', function ($FirebaseObject, $q) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var rootRef = new Firebase('https://project-8173709998114393093.firebaseio.com/');



    function setUser(user){

      rootRef.child('emailList').on("value", function(snapshot) {
        var id = getUserIDFromEmail(snapshot.val(), user.email);
        if(id == null){
          var pushed = rootRef.child('users').push(user);
          setEmailList(user.email, pushed.key());
        }else{
          rootRef.child('users').child(id).update(user);
        }
      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });

    }

    function getUserIDFromEmail(list, value){
      for(var i in list){
        if(list[i].email == value){
          return list[i].id;
        }
      }
      return null;
    }

    function getQuestions(){
      var questions = $q.defer();
      rootRef.child('questions').on("value", function(snapshot) {
        console.log(snapshot.val());
        questions.resolve(snapshot.val());
      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });

      return questions.promise;
    }


    function saveQuestion(question){
      var pushed = rootRef.child('questions').push(question);
      return pushed.key();
    }

    function getEmailList(){
      rootRef.child('emailList').on("value", function(snapshot) {
        return snapshot.val();
      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });
    }



    function setEmailList(email, id) {
      rootRef.child('emailList').push({email: email, id: id});
    }


    function saveComment(comment){
      console.log('comment', comment);
      rootRef.child('comments').child(comment.qID).push(comment);
    }

    function getComments(qID){
      var comments = $q.defer();
      rootRef.child('comments').child(qID).on("value", function(snapshot) {
        //console.log(snapshot.val());
        comments.resolve(snapshot.val());
      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });

      return comments.promise;

    }




    return{
      saveQuestion: saveQuestion,
      setUser: setUser,
      getQuestions: getQuestions,
      getEmailList: getEmailList,
      getComments: getComments,
      saveComment: saveComment
    }

  });

