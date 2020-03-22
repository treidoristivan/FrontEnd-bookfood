import React from 'react';
import { UncontrolledCarousel } from 'reactstrap';
import img1 from './assets/frontjco.jpg';
import img2 from './assets/frontkfc.jpg';
import img3 from './assets/frontmcd.jpg';
import img4 from './assets/frontph.jpg';
import img5 from './assets/frontsb.jpg'



class Example  extends React.Component{
  items =  [
  {
    src:img1,
    altText: 'Slide 1',
    key: '1'
  },
  {
    src:img2,
    altText: 'Slide 2',
 
    key: '2'
  },
  {
    src:img3,
    altText: 'Slide 3',
    key: '3'
  },
  {
    src:img4,
    altText: 'Slide 3',

    key: '3'
  },
  {
    src:img5,
    altText: 'Slide 3',

    key: '3'
  }
];
render() {
  return (
  <>
  <div style={{width:"100%", height:"100%", padding:"20px"}}>
  <UncontrolledCarousel items={this.items} />
  </div>
  </>
  )
}
}
export default Example;

