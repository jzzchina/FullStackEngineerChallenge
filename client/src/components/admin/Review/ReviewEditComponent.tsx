import React from 'react';
import { Redirect } from 'react-router-dom';
import {EmployeeModel} from '../../../redux/models/EmployeeModel'
import {ReviewModel} from '../../../redux/models/ReviewModel'
import {EditType} from '../../../constants/EditTypes'
import { EmployeesState } from '../../../redux/reducers/admin/EmployeesReducer';
import history from '../../../utils/history'
import { Template } from 'webpack';

interface Props {
    loginId: string,
    editMode: EditType,
    employees: EmployeeModel[],
    reviews: ReviewModel[],
    // // updateSuccess: boolean;
    addReview(review: ReviewModel): void;
    editReview(review: ReviewModel): void;
    deleteReview(review: ReviewModel): void;
    // editEmployee(employee: EmployeeModel): void;
    // deleteEmployee(employee: EmployeeModel): void;
}

interface State {
    Uid: number;
    ReviewAccountId: string;
    TargetAccountId: string;
    Name: string;
    Rank: string;
    Description: string;
    FeedbackAccountId: string;
    FeedbackName: string;
}


export default class ReviewEditComponent extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            Uid: 0,
            ReviewAccountId: '',
            TargetAccountId: '',
            Name: '',
            Rank: 'Average',
            Description: '',
            FeedbackAccountId: '',
            FeedbackName: ''
        };
    }

    componentWillMount () {
        const { match, reviews, editMode } = this.props;
        if(editMode !== EditType.New){
            const id = parseInt(match.params.id);

            const selectReview = reviews.find(e => e.Uid === id);
            this.setState({
                ...this.state,
                Uid: selectReview.Uid,
                ReviewAccountId: selectReview.ReviewAccountId,
                TargetAccountId: selectReview.TargetAccountId,
                Name: selectReview.Name,
                Rank: selectReview.Rank,
                Description: selectReview.Description,
                FeedbackAccountId: selectReview.FeedbackAccountId,
            });
        }
    }

    getCurrentReview(){
        const {loginId} = this.props;
        const {Uid, ReviewAccountId,TargetAccountId, Name, Rank, Description, FeedbackAccountId } = this.state;


        const review: ReviewModel = {
            Uid:Uid,
            ReviewAccountId: loginId,
            TargetAccountId: TargetAccountId,
            Name: Name,
            Rank: Rank,
            Description: Description,
            FeedbackAccountId : FeedbackAccountId
        };

        return review;
    }

    onCreateClick(){
        const {addReview} = this.props;
        const review = this.getCurrentReview();

        addReview(review);
    }

    onEditClick(){
        const {editReview} = this.props;
        const review = this.getCurrentReview();

        editReview(review);
    }

    onDeleteClick(){
        const {deleteReview} = this.props;
        const review = this.getCurrentReview();

        deleteReview(review);
    }

    onBackClick(){
        history.push("/reviews");
    }

    renderNameOptions(){
        const {employees} = this.props;

        return employees.map((item) => {
            return ([
                <option key={item.AccountId} value={item.AccountId}>{item.Name}</option>
            ]);
          });
    }

    renderNameComponent(){
        const { Name, Rank, Description, TargetAccountId,FeedbackAccountId   } = this.state;
        const { editMode } = this.props;

        if(editMode === EditType.New){
            return (
                <select className="form-control" value={TargetAccountId} onChange={e => this.setState({
                    TargetAccountId: e.currentTarget.value
                    })}>
                    <option key="empty" value="empty"></option>
                    {this.renderNameOptions()}
                </select>
            );

        }else {
            return (
                <label className="form-control">{Name}</label>
            );
        }
    }

    render() {
        const { Name, Rank, Description, TargetAccountId,FeedbackAccountId   } = this.state;
        const { editMode } = this.props;

        let title, button;
        if(editMode === EditType.New){
            title = "Create review"
            button = <button className="btn btn-primary" onClick={(e) => this.onCreateClick()}>Create</button>;
        }else if(editMode === EditType.Edit){
            title = "Update review"
            button = <button className="btn btn-primary" onClick={(e) => this.onEditClick()}>Save</button>;
        }else if(editMode === EditType.Delete){
            title = "Delete review"
            button = <button className="btn btn-primary" onClick={(e) => this.onDeleteClick()}>Delete</button>;
        }

        return(
            <div>
                <div className="col-md-6 col-md-offset-3">
                <h2>{title}</h2>

                <div className='form-group'>
                    <label >Employee</label>
                    {this.renderNameComponent()}
                </div>
                <div className='form-group'>
                    <label>Rank</label>
                    <select  className="form-control" value={Rank} onChange={e => this.setState({Rank: e.currentTarget.value})}>
                        <option key="Excellent" value="Excellent">Excellent</option>
                        <option key="Good" value="Good">Good</option>
                        <option key="Average" value="Average">Average</option>
                        <option key="Fair" value="Fair">Fair</option>
                        <option key="Poor" value="Poor">Poor</option>
                    </select>
                </div>
                <div className='form-group'>
                    <label>Description</label>
                    <textarea className="md-textarea form-control" rows={3} value={Description}
                    onChange={e => this.setState({Description: e.currentTarget.value}) }></textarea>
                </div>
                <div className='form-group'>
                    <label>Set Feedback employee</label>
                    <select className="form-control" value={FeedbackAccountId} onChange={e => this.setState({
                            FeedbackAccountId: e.currentTarget.value
                        })}>
                        <option key="empty" value="empty"></option>
                        {this.renderNameOptions()}
                    </select>
                </div>
                <div className="form-group">
                    {button}
                    <button type="button" style={{float:"right"}} className="btn btn-link" onClick={(e) => this.onBackClick()}>Back to List</button>
                </div>

            </div>
            </div>
        );

    }
}