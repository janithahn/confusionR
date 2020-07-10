import React, { Component } from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle, BreadcrumbItem, Breadcrumb, Button, Modal, ModalHeader, ModalBody, Label, Row, Col} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Control, LocalForm, Errors} from 'react-redux-form';
import {Loading} from './LoadingComponent';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    render() {
        return(
            <React.Fragment>
                <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
                    <ModalHeader toggle={this.props.toggle}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm className="container" onSubmit={values => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label md={{size: 12}} htmlFor="rating">Rating</Label>
                                <Col md={{size: 12}}>
                                    <Control.select model=".rating" name="rating" 
                                        className="form-control"
                                    >
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label md={{size: 12}} htmlFor="author" >Your Name</Label>
                                <Col md={{size: 12}}>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required ',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label md={{size: 12}} htmlFor="comment" >Comment</Label>
                                <Col md={{size: 12}}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="6"
                                        className="form-control"
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size: 10}}>
                                    <Button type="submit" color="primary">Submit</Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}

function RenderDish({dish}) {
    if(dish != null) {
        return (
            <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name}></CardImg>
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );
    }else {
        return (
            <div></div>
        );
    }
}

function RenderComments({dish, isModalOpen, toggleModal, addComment, dishId}) {
    if(dish != null) {
        const commentsVar = dish.comments.map((com) => {
            return (
                <div key={com.id}>
                    <div className="list-unstyled">
                        <p>{com.comment}</p>
                    </div>
                    <div className="list-unstyled">
                        <p>{"--" + com.author + ", " + new Intl.DateTimeFormat('en-US',{year: 'numeric', month:'short', day:'2-digit'}).format(new Date(Date.parse(com.date)))}</p>
                    </div>
                </div>
            );
        });
        return (
            <div>
                <h4>Comments</h4>
                {commentsVar}
                <Button outline onClick={toggleModal}><span className="fa fa-pencil">Submit Comment</span></Button>
                <CommentForm dishId={dishId} addComment={addComment} isOpen={isModalOpen} toggle={toggleModal}/>
            </div>
        );
    }else {
        return (
            <div></div>
        );
    }
} 

class DishDetail extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    render() {
        if(this.props.isLoading) {
            return(
                <div className="container">
                    <div className="row">
                        <Loading/>
                    </div>
                </div>
            );
        }else if(this.props.errMess){
            return(
                <div className="container">
                    <div className="row">
                        <h4>{this.props.errMess}</h4>
                    </div>
                </div>
            );
        }else if (this.props.dish != null){
            return (
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem>
                                <Link to="/home">Home</Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem>
                                <Link to="/menu">Menu</Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{this.props.dish.name}</h3>
                            <hr/>
                        </div>
                    </div>
                    <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={this.props.dish}/>
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments addComment={this.props.addComment} dishId={this.props.dish.id} dish={this.props} isModalOpen={this.state.isModalOpen} toggleModal={this.toggleModal}/>
                    </div>
                    </div>
                </div>
            );
        } else {
            return(
                <div></div>
            );
        }
    }
}

export default DishDetail;