'use strict';

(function() {

  angular.module('thisvsthatApp')
    .config(['ChartJsProvider', function (ChartJsProvider) {
      // Configure all charts
      ChartJsProvider.setOptions({
        colours: ['#FF0000', '#0000FF'],
        responsive: true
      });
      // Configure all pie charts
      ChartJsProvider.setOptions('Pie', {
        datasetFill: true,
        chartLegend: true
      });
      // Configure all bar charts
      ChartJsProvider.setOptions('Bar', {
        datasetFill: true,
        chartLegend: true
      });
    }])
    .controller('mainCtrl', function($scope, $mdDialog, $cookies, $firebaseObject, dbConfig){

      // function expressions
      $scope.answered = answeredQuestion;
      $scope.questAnswered = answeredQuestion;
      $scope.test = test;
      $scope.flagComment = flagComment;
      $scope.flagQuestion = flagQuestion;
      $scope.likeComment = likeComment;
      $scope.nextQuestion = nextQuestion;

      // Dialog functions
      $scope.askQuestion = askQuestionDialog;
      $scope.commentDialog = commentDialog;
      $scope.commentSubmitted = commentSubmitted;
      $scope.qAsked = qAsked;





      $scope.curQuestion;
      // Data Variables ======================================
      var questions = [];
      $scope.comments = [] //=[{text: "Pepsi is soooo gooood!!!", date:new Date(), likes: 0, flags: 0, email:"", nickName:"Anonymous", qID:''}];
      dbConfig.getQuestions().then(function (data) {
        var count = 0;
        var keys = Object.keys(data);
        for(var i in data){
          questions.push(data[i]);
          questions[count].qID = keys[count];
          count++;
        }

        $scope.curQuestion = questions[0];

        $scope.comments = getComments(questions[0].qID);
      });
      $scope.user = {email:"", isE: false, isMale: true, nickName:"",questions:[], lastLogin:new Date()};
      $scope.newQ = {question: "", optionA:"", optionB:"",category:'', optionANum:0,optionBNum:0,flags:0,likes:0, whoAnswered:[], ownerEmail:'', created: new Date()};
      $scope.quAnswered = false;
      $scope.newComment = {text: "", date:new Date(), likes: 0, flags: 0, email:"", nickName:"", qID:''};
      $scope.quAnswered = -1;
      var questIndex = 0;





      // Chart Variables
      $scope.pieData = [30,50];
      $scope.chartData = [[30,60],[50,20]];
      $scope.series = [ 'Female', 'Male'];
      $scope.chartLabels = ['Pepsi', 'Coca-Cola'];
      Chart.defaults.global.responsive = true;



      // ============================== Functions -------------------------------------------------
      function answeredQuestion(ans){
        $scope.quAnswered = ans;
        //console.log("answered question ans: " + $scope.quAnswered);
        //option A is picked
        if(ans == 0){

        }else{
          //option B is picked

        }
      }

      function askQuestionDialog(ev){
        //console.log('ask');
        if($cookies.get('email') != null)
          $scope.user.email = $cookies.get('email');
        else
          //console.log('no email');

        //console.log('email', $scope.user);

        $mdDialog.show({
          controller: "mainCtrl",
          templateUrl: '../dialogs/askQuestionDialog/askQuestionDialog.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:false
        });
      }


      function commentDialog(ev){
       console.log('comment');
        if($cookies.get('email') != null)
          $scope.user.email = $cookies.get('email');


        $mdDialog.show({
          controller: "mainCtrl",
          templateUrl: '../dialogs/commentDialog/commentDialog.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:false
        });
      }

      function test(){
        console.log("Testing testing");
      }

      function qAsked(){
        if($cookies.get('email') == null || $cookies.get('email') != $scope.user.email) {
          $cookies.put('email', $scope.user.email);
        }
        $scope.newQ.ownerEmail = $scope.user.email;
        questions.push($scope.newQ);
        var qID = dbConfig.saveQuestion($scope.newQ);
        $scope.user.questions.push(qID);
        dbConfig.setUser($scope.user);
        $mdDialog.hide();
      }

      function commentSubmitted(){
        // cacheing email
        if($cookies.get('email') == null || $cookies.get('email') != $scope.user.email) {
          $cookies.put('email', $scope.user.email);
          //console.log("email saved");
        }
        // Cacheing nick name
        if($cookies.get('nickName') == null || $cookies.get('nicName') != $scope.user.nickName) {
          $cookies.put('nickName', $scope.user.nickName);

        }


        if($scope.user.nickName != "")
          $scope.newComment.nickName = $scope.user.nickName;

        $scope.newComment.qID = $scope.curQuestion.qID;
        $scope.newComment.email = $scope.user.email;
       // $scope.comments.push($scope.newComment);

        dbConfig.saveComment($scope.newComment);

        $mdDialog.hide();
      }

      function getComments(id){
        var comments = [];
        dbConfig.getComments(id).then(function(data){
          for(var i in data){
            comments.push(data[i]);
          }
          return comments;
        })
      }

      function flagComment(index){

      }

      function likeComment(index){

      }

      function flagQuestion(){

      }

      function nextQuestion(){
        console.log("current question:", $scope.curQuestion);
        console.log("current index:", questIndex);
        console.log("questions:", questions);

        $scope.quAnswered = -1;


        $scope.curQuestion = questions[questIndex++ % questions.length];

      }

      $scope.cancelDialog = function(){
        $mdDialog.cancel();
      }


    });})();
