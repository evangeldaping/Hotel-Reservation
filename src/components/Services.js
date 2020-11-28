import React, { Component } from 'react'
import {FaCocktail, FaHiking, FaShuttleVan, FaBeer} from 'react-icons/fa'
import Title  from './Title'

export default class Services extends Component {
    state={
        services:[
            {
                icon:<FaCocktail/>,
                title:"Free Cocktails",
                info:'Magna id pariatur enim occaecat eu aliqua voluptate occaecat mollit quis dolore aliquip ullamco.'
            },
            {
                icon:<FaHiking/>,
                title:"Endless Hiking",
                info:'Magna id pariatur enim occaecat eu aliqua voluptate occaecat mollit quis dolore aliquip ullamco.'
            },
            {
                icon:<FaShuttleVan/>,
                title:"Free Shuttle",
                info:'Magna id pariatur enim occaecat eu aliqua voluptate occaecat mollit quis dolore aliquip ullamco.'
            },
            {
                icon:<FaBeer/>,
                title:"Strongest Beer",
                info:'Magna id pariatur enim occaecat eu aliqua voluptate occaecat mollit quis dolore aliquip ullamco.'
            }
        ]
    }
    render() {
        return (
            <section className="services">
                <Title title="services"/>
                <div className="services-center">
                {this.state.services.map((item,index) => {
                    return (
                        <article key={index} className="service">
                            <span>{item.icon}</span>
                            <h6>{item.title}</h6>
                            <p>{item.info}</p>
                        </article>
                    );
                })}
                </div>
            </section>
        )
    }
}
