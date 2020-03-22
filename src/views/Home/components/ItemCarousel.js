import React from 'react';
import { UncontrolledCarousel, Container } from 'reactstrap';
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
    caption: 'Slide 1',
    header: 'Slide 1 Header',
    key: '1'
  },
  {
    src:img2,
    altText: 'Slide 2',
    caption: 'Slide 2',
    header: 'Slide 2 Header',
    key: '2'
  },
  {
    src:img3,
    altText: 'Slide 3',
    caption: 'Slide 3',
    header: 'Slide 3 Header',
    key: '3'
  },
  {
    src:img4,
    altText: 'Slide 3',
    caption: 'Slide 3',
    header: 'Slide 3 Header',
    key: '3'
  },
  {
    src:img5,
    altText: 'Slide 3',
    caption: 'Slide 3',
    header: 'Slide 3 Header',
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

