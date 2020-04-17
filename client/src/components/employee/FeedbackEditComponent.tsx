import React from 'react';
import { Redirect } from 'react-router-dom';
import {FeedbackModel} from '../../redux/models/FeedbackModel'
// import {ReviewModel} from '../../../redux/models/ReviewModel'
// import {EditType} from '../../../constants/EditTypes'
// import { EmployeesState } from '../../../redux/reducers/admin/EmployeesReducer';
import history from '../../utils/history'
import { Template } from 'webpack';

interface Props {
    feedbacks: FeedbackModel[],
    // addReview(review: FeedbackModel): void;editFeedbacks
    editFeedbacks(review: FeedbackModel): void;
    // deleteReview(review: ReviewModel): void;
}


interface State {
    _uid: number;
    _name: string;
    _rank: string;
    _description: string;
}

export default class FeedbackEditComponent extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            _uid: 0,
            _name: '',
            _rank: 'Average',
            _description: '',
        };
    }

    componentWillMount () {
        const { match, feedbacks } = this.props;
        const id = parseInt(match.params.id);

        const selectReview = feedbacks.find(e => e.Uid === id);
        this.setState({
            ...this.state,
            _uid: selectReview.Uid,
            _name: selectReview.Name,
            _rank: selectReview.Rank,
            _description: selectReview.Description,
        });
    }

    onEditClick(){
        const {_uid, _name, _rank, _description } = this.state;
        const {editFeedbacks} = this.props;

        const feedbacks: FeedbackModel = {
            Uid: _uid,
            Name: _name,
            Rank: _rank,
            Description: _description,
        };

        editFeedbacks(feedbacks);
    }


    onBackClick(){
        history.push("/reviews");
    }


    render() {
        const {_uid, _name, _rank, _description } = this.state;

        return(
            <div>
                <div className="col-md-6 col-md-offset-3">
                <h2>Feedback</h2>

                <div className='form-group'>
                    <label >Employee</label>
                    <label className="form-control">{_name}</label>
                </div>
                <div className='form-group'>
                    <label>Rank</label>
                    <select  className="form-control" value={_rank} onChange={e => this.setState({_rank: e.currentTarget.value})}>
                        <option key="Excellent" value="Excellent">Excellent</option>
                        <option key="Good" value="Good">Good</option>
                        <option key="Average" value="Average">Average</option>
                        <option key="Fair" value="Fair">Fair</option>
                        <option key="Poor" value="Poor">Poor</option>
                    </select>
                </div>
                <div className='form-group'>
                    <label>Description</label>
                    <textarea className="md-textarea form-control" rows={3} value={_description}
                    onChange={e => this.setState({_description: e.currentTarget.value}) }></textarea>
                </div>
                <div className="form-group">
                    <button className="btn btn-primary" onClick={(e) => this.onEditClick()}>Save</button>
                    <button type="button" style={{float:"right"}} className="btn btn-link" onClick={(e) => this.onBackClick()}>Back to List</button>
                </div>

            </div>
            </div>
        );

    }
}