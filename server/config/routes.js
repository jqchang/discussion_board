var categories = require('../controllers/category.js');
var comments = require('../controllers/comment.js');
var posts = require('../controllers/post.js');
var topics = require('../controllers/topic.js');
var users = require('../controllers/user.js');

module.exports = function(app){
  app.get('/categories', function(req, res) {
    categories.index(req, res); });
  app.get('/categories/:id', function(req, res) {
    categories.show(req, res); });
  app.post('/categories', function(req, res) {
    categories.create(req, res); });
  app.put('/categories/:id', function(req, res){
    categories.update(req, res); });
  app.delete('/categories/:id', function(req, res) {
    categories.delete(req, res); });
  app.get('/comments', function(req, res) {
    comments.index(req, res); });
  app.get('/comments/:id', function(req, res) {
    comments.show(req, res); });
  app.post('/comments', function(req, res) {
    comments.create(req, res); });
  app.put('/comments/:id', function(req, res){
    comments.update(req, res); });
  app.delete('/comments/:id', function(req, res) {
    comments.delete(req, res); });
  app.get('/posts', function(req, res) {
    posts.index(req, res); });
  app.get('/posts/:id', function(req, res) {
    posts.show(req, res); });
  app.post('/posts', function(req, res) {
    posts.create(req, res); });
  app.put('/posts/:id', function(req, res){
    posts.update(req, res); });
  app.delete('/posts/:id', function(req, res) {
    posts.delete(req, res); });
  app.get('/topics', function(req, res) {
    topics.index(req, res); });
  app.get('/topics/:id', function(req, res) {
    topics.show(req, res); });
  app.post('/topics', function(req, res) {
    topics.create(req, res); });
  app.put('/topics/:id', function(req, res){
    topics.update(req, res); });
  app.delete('/topics/:id', function(req, res) {
    topics.delete(req, res); });
  app.get('/users', function(req, res) {
    users.index(req, res); });
  app.get('/users/:id', function(req, res) {
    users.show(req, res); });
  app.post('/users', function(req, res) {
    users.create(req, res); });
  app.put('/users/:id', function(req, res){
    users.update(req, res); });
  app.delete('/users/:id', function(req, res) {
    users.delete(req, res); });
}
