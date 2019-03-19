import cssTranspile from './cssTranspile';

export default function cssBuild() {
  return Promise.all([
    cssTranspile('nested', 'camo.css'),
    cssTranspile('compressed', 'camo.min.css')
  ]);
}
