'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('/sessions', 'SessionController.store').validator('Session')
Route.post('/users', 'UserController.store').validator('User')

Route.group(() => {
  Route.get('/roles', 'RoleController.index')
  Route.resource('/teams', 'TeamController').validator(new Map(
    [
      [
        ['teams.store', 'teams.update'],
        ['Team']
      ]
    ]
  ))
}).middleware('auth')

Route.group(() => {
  Route.post('/invites', 'InviteController.store').validator('Invite').middleware('can:create-invite')
  Route.resource('/projects', 'ProjectController').validator(new Map(
    [
      [
        ['projects.store', 'projects.update'],
        ['Project']
      ]
    ]
  )).middleware(new Map(
    [
      [
        ['projects.store', 'projects.update'],
        ['can:create-project']
      ]
    ]
  ))
  Route.get('/members', 'MemberController.index')
  Route.put('/members/:id', 'MemberController.update').middleware('is:admin')
  Route.get('/authorizations', 'AuthorizationController.show')
}).middleware(['auth', 'team'])
