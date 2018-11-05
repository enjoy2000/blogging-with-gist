// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
  DefaultPage,
  GistDetailPage,
  CreateGist,
} from './';
import requireAuthentication from '../../common/requireAuthentication'

export default {
  path: 'blog',
  name: 'Blog',
  childRoutes: [
    { path: 'default-page', name: 'Default page', component: DefaultPage, isIndex: true },
    { path: 'create', name: 'Create gist', component: requireAuthentication(CreateGist) },
    { path: ':gist', name: 'Gist detail page', component: requireAuthentication(GistDetailPage) },
  ],
};
