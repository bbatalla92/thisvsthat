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
    .controller('mainCtrl', function($scope, $mdDialog, $cookies){

      // function expressions
      $scope.answered = answeredQuestion;
      $scope.test = test;
      $scope.flagComment = flagComment;
      $scope.flagQuestion = flagQuestion;
      $scope.likeComment = likeComment;

      // Dialog functions
      $scope.askQuestion = askQuestionDialog;
      $scope.commentDialog = commentDialog;
      $scope.commentSubmitted = commentSubmitted;
      $scope.qAsked = qAsked;





      // Data Variables
      //$scope.Questions = ;    @TODO
      //$scope.comments = ;    @TODO

      $scope.comments = [{text: "Pepsi si soooo gooood!!!", date:new Date(), likes: 0, flags: 0, email:"", nickName:"Anonymous", qID:''}];
      $scope.user = {email:"", isE: false, isMale: true, nickName:""};
      $scope.newQ = {question: "", optionA:"", optionB:"",category:''};
      $scope.quAnswered = false;
      $scope.newComment = {text: "", date:new Date(), likes: 0, flags: 0, email:"", nickName:"", qID:''};





      // Chart Variables
      $scope.pieData = [30,50];
      $scope.chartData = [[30,60],[50,20]];
      $scope.chartLabels = [ 'Female', 'Male'];
      $scope.series = ['Pepsi', 'Coca-Cola'];
      Chart.defaults.global.responsive = true;



      // ============================== Functions -------------------------------------------------
      function answeredQuestion(ans){

      }

      $scope.hi = 'hi';

      function askQuestionDialog(ev){
        console.log('ask');
        if($cookies.get('email') != null)
          $scope.user.email = $cookies.get('email');
        else
          console.log('no email');

        console.log('email', $scope.user);

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
        else
          console.log('no email');

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
          console.log("email saved");
        }

        console.log("User",$scope.user);
        console.log("Question",$scope.newQ);
        $mdDialog.hide();
      }

      function commentSubmitted(){
        // cacheing email
        if($cookies.get('email') == null || $cookies.get('email') != $scope.user.email) {
          $cookies.put('email', $scope.user.email);
          console.log("email saved");

        }
        // Cacheing nick name
        if($cookies.get('nickName') == null || $cookies.get('nicName') != $scope.user.nickName) {
          $cookies.put('email', $scope.user.email);
          console.log("email saved");
        }
        if($scope.user.nickName != "")
          $scope.newComment.nickName = $scope.user.nickName;
        else
          $scope.newComment.nickName = 'Anonymous';



        $scope.newComment.email = $scope.user.email;

        console.log("comment", $scope.newComment);
        $scope.comments.push($scope.newComment);
        console.log("comments arr", $scope.comments);

        //@TODO Add new comment to DB
        // service.addToDB();

        $mdDialog.hide();
      }

      function flagComment(index){

      }

      function likeComment(index){

      }

      function flagQuestion(){

      }

      $scope.cancelDialog = function(){
        $mdDialog.cancel();
      }


    });})();
