import React from 'react';
import {FeedbackModel} from '../../redux/models/FeedbackModel'
import history from '../../utils/history'

interface Props {
    loginId: string;
    feedbacks: FeedbackModel[],
    getEmployeeFeedbackData(): void;
}

export default class FeedbackComponent extends React.Component<Props, {}> {
    componentWillMount() {
        const { getEmployeeFeedbackData } = this.props;
        getEmployeeFeedbackData();
    }

    updateFeedback(id?: number){
        history.push("/employee-feedback/" + id);
    }

    updateReview(){

    }

    renderTable(){
        const {feedbacks} = this.props;
        if(feedbacks.length === 0)
            return null;


        return feedbacks.map((item) => {
            return ([
              <tr key={'Row_' + item.Uid}>
                <td>{item.Name}</td>
                <td>{item.Rank}</td>
                <td>{item.Description}</td>
                <td>
                    <button type="button" className="btn btn-link" onClick={(e) => this.updateFeedback(item.Uid)}>Feedback</button>
                </td>
              </tr>
            ]);
          });
    }

    render() {
        return(
            <div>
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