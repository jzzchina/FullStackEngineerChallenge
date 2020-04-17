import React from 'react';
import {ReviewModel} from '../../../redux/models/ReviewModel'
import { Link, NavLink } from 'react-router-dom';
import {EditType} from '../../../constants/EditTypes'
import history from '../../../utils/history'

interface Props {
    loginId: string;
    reviews: ReviewModel[],
    getReviewsData(): void;
    setReviewEditMode(mode: EditType): void;
}

export default class ReviewsComponent extends React.Component<Props, {}> {
    componentWillMount() {

        const {getReviewsData} = this.props;
        getReviewsData();
    }

    updateReview(mode: EditType, id?: number){
        const {setReviewEditMode} = this.props;

        setReviewEditMode(mode);
        if(mode === EditType.New){
            history.push("/reviews/add");
        }else if(mode === EditType.Edit){
            history.push("/reviews/edit/" + id);
        }else if(mode === EditType.Delete){
            history.push("/reviews/delete/" + id);
        }
    }

    renderTable(){
        const {reviews} = this.props;
        if(reviews.length === 0)
            return null;


        return reviews.map((item) => {
            return ([
              <tr key={'Row_' + item.Uid}>
                <td>{item.Name}</td>
                <td>{item.Rank}</td>
                <td>{item.Description}</td>
                <td>
                    <button type="button" className="btn btn-link" onClick={(e) => this.updateReview(EditType.Edit, item.Uid)}>Edit</button> |
                    <button type="button" className="btn btn-link" onClick={(e) => this.updateReview(EditType.Delete, item.Uid)}>Delete</button>
                </td>
              </tr>
            ]);
          });
    }

    render() {
        return(
            <div>
               <p><button type="button" className="btn btn-link" onClick={(e) => this.updateReview(EditType.New)}>Create review</button></p>
               <table className="table table-hover">
                    <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Rank</th>
                        <th scope="col">Description</th>
                        <th scope="col"></th>
                    </tr>
                    </thead>

                    <tbody>
                     {this.renderTable()}
                    </tbody>
                </table>
            </div>
        );

    }
}