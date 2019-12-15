import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Panel, FormGroup, FormControl, Button } from 'react-bootstrap'
import { handleAddNewQuestion } from '../actions/questions'
import { withRouter, Redirect } from 'react-router-dom'
import { showLoading, hideLoading } from 'react-redux-loading'

class NewQuestion extends Component{

    _isMounted = false;

    componentWillUnmount() { this._isMounted = false; }
    componentDidMount() { this._isMounted = true;}

    state = {
        optionOne: "",
        optionTwo: "",
        validation: null,
        toHome: false
    }

    handleChange(e,option) {
        this.setState({
            [option]: e.target.value
        });
    }

    handleOnAddNewQuestion = async (e) => {
        e.preventDefault();
        const { dispatch, authedUser } = this.props;
        
        dispatch(showLoading());

        if (this.state.optionOne.length <= 0 || this.state.optionTwo.length <= 0) {
            this.setState({ validation: "error" }); return;
        }
        else {
            this.setState({ validation: "success" });
        }

        dispatch(handleAddNewQuestion({
            optionOneText: this.state.optionOne,
            optionTwoText: this.state.optionTwo,
            author: authedUser
        }))
            
        if (this._isMounted) {this.setState({toHome: true})}; 
    
        dispatch(hideLoading());       
        
    }

    render(){

        const { toHome } = this.state;

        if (toHome === true) {            
            this.props.history.push('/');
            return <p></p>
        }
        else
        return(
            <div className='flexContainerRowCenter'>
                <Panel className="questionPanel">
                    <Panel.Heading>
                        <div style={{textAlign:'center'}}><h2><b>Create New Question</b></h2></div>
                    </Panel.Heading>
                    <Panel.Body>
                        <div>Complete the question:</div><br/>
                        <div><h4><b>Would you rather ...</b></h4></div>
                        <br/>
                        <FormGroup validationState={this.state.validation}>
                            <FormControl
                                type="text"
                                value={this.state.optionOne}
                                placeholder="Enter Option One Text Here"
                                onChange={(e) => this.handleChange(e,'optionOne')}
                            />
                            <div style={{textAlign:'center'}}><h4><b>OR</b></h4></div>
                            <FormControl
                                type="text"
                                value={this.state.optionTwo}
                                placeholder="Enter Option Two Text Here"
                                onChange={(e) => this.handleChange(e,'optionTwo')}
                            />
                            <br/>
                            <Button
                                type="submit"
                                className="submitBtn"
                                onClick={this.handleOnAddNewQuestion}>
                                Submit
                            </Button>
                        </FormGroup>
                    </Panel.Body>
                </Panel>
            </div>
        )
    };

};

function mapStateToProps({authedUser}) {
    return {
        authedUser,
    }
}

export default withRouter(connect(mapStateToProps)(NewQuestion))
