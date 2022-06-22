import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle} from 'reactstrap';

class DishDetail extends Component {
    constructor(props) {
        super(props);
    }

    renderDish (selDish) {
        return (
            <Card className="col-12 col-md-5 m-1">
                <CardImg width="100%" src={selDish.image} alt={selDish.name}/>
                <CardBody>
                    <CardTitle><strong>{selDish.name}</strong></CardTitle>
                    <CardText>{selDish.description}</CardText>
                </CardBody>
            </Card>
        )
    }

    renderComments (comments) {
        let commentElem;
        if(comments) {
            commentElem = comments.map((comment) => { 
                return ( <li key={comment.id}> <p>{comment.comment}</p> <p>-- {comment.author}, {comment.date}</p> </li> ) 
            })
        } else {
            commentElem = <div></div>;
        }
        return commentElem;
    }

    render () {
        const selDish = this.props.dishSel;
        // https://coursera-assessments.s3.amazonaws.com/assessments/1655888367861/f6dd4118-a9e1-4082-94ae-66eaa6bd5ed7/DishdetailComponent.js
        if(selDish){
            return (
                <div className="row">
                    {this.renderDish(selDish)}
                    <div className="col-12 col-md-6 m-1">
                        <h4>Comments</h4>
                        <ul className = "list-unstyled">
                            {this.renderComments(selDish.comments)}
                        </ul>
                    </div>
                </div>
            );
        } else {
            return (
                <div></div>
            );
        }
            
    }
}

export default DishDetail;