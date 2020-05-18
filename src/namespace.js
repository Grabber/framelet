'use strict';

import { invariant } from './utils';

function match(namespaces, needles, option) {
   const c = namespaces[0];
   const n = needles[0];
   const oc = namespaces.slice(1);
   const on = needles.slice(1);
   const wil = option.wil;

   if (n !== c && [n, c].indexOf(wil) === -1)
      return false;

   /* a.b.c - a.b.c, a.b.* - a.b.c, a.b.c - a.b.* */
   if (on.length === 0 && oc.length === 0)
      return n === c || [n, c].indexOf(wil) !== -1;

   /* a.b - a.b.c false, a.b - a.b.* false, a.* - a.b.c true */
   if (on.length === 0)
      return n === wil;

   /* a.b.c - a.b false, a.b.* - a.b false, a.b.c - a.* true */
   if (oc.length === 0)
      return c === wil;

   return match(oc, on, option);
}

const check = namespace => {
   invariant(typeof namespace === 'string', '`namespace` must be a string');
};

export default (namespace, opt) => {
   check(namespace);

   const option = Object.assign({
      sep: '.',
      wil: '*'
   }, opt);

   return {
      match: (needle) => {
         check(needle);

         return match(namespace.split(option.sep), needle.split(option.sep), option);
      }
   };
};