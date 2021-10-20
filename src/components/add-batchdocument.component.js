import React, {Component} from "react";
import BatchDocumentDataService from "../services/batchdocument.service";

export default class AddBatchDocument extends Component {
    constructor(props) {
        super(props);
        this.onChangeBatchName = this.onChangeBatchName.bind(this);
        this.onChangeSiteId = this.onChangeSiteId.bind(this);
        this.onChangeUserIdKeyVerified = this.onChangeUserIdKeyVerified.bind(this);
        this.saveBatchDocument = this.saveBatchDocument.bind(this);
        this.newBatchDocument = this.newBatchDocument.bind(this);
        this.state = {
            BatchId: null,
            BatchName: "",
            SiteId: "",
            UserIdKeyVerified: "",
            submitted: false
        };
    }

    onChangeBatchName(e) {
        this.setState({
            BatchName: e.target.value
        });
    }
    onChangeUserIdKeyVerified(e) {
        this.setState({
          UserIdKeyVerified: e.target.value
        });
    }

    onChangeSiteId(e) {
      this.setState({
           SiteId: e.target.value
      });
  }
    saveBatchDocument() {
        var data = {
            batchName: this.state.BatchName,
            siteId: this.state.SiteId,
            userIdKeyVerified: this.state.UserIdKeyVerified
        };

        BatchDocumentDataService.create(data)
        .then(response => {
            this.setState({
                batchId: response.data.batchId,
                batchName: response.data.batchName,
                siteId: response.data.siteId,
                userIdKeyVerified: response.data.userIdKeyVerified,

                submitted: true
            });
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }

    newBatchDocument() {
        this.setState({
            id: null,
            BatchName: "",
            SiteId: "",
            UserIdKeyVerified: "",
            submitted: false
          });
        }
      
        render() {
            return (
                <div className="submit-form">
                  {this.state.submitted ? (
                    <div>
                      <h4>You submitted successfully!</h4>
                      <button className="btn btn-success" onClick={this.newBatchDocument}>
                        Add
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className="form-group">
                        <label htmlFor="BatchName">Batch Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="BatchName"
                          required
                          value={this.state.BatchName}
                          onChange={this.onChangeBatchName}
                          name="BatchName"
                        />
                      </div>
          
                      <div className="form-group">
                        <label htmlFor="SiteId">Site Id</label>
                        <input
                          type="text"
                          className="form-control"
                          id="SiteId"
                          required
                          value={this.state.SiteId}
                          onChange={this.onChangeSiteId}
                          name="SiteId"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="UserIdKeyVerified">UserIdKeyVerified</label>
                        <input
                          type="text"
                          className="form-control"
                          id="UserIdKeyVerified"
                          required
                          value={this.state.UserIdKeyVerified}
                          onChange={this.onChangeUserIdKeyVerified}
                          name="UserIdKeyVerified"
                        />
                      </div>
          
                      <button onClick={this.saveBatchDocument} className="btn btn-success">
                        Submit
                      </button>
                    </div>
                  )}
                </div>
              );
            }
        }
