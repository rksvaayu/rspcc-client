import React, { Component } from "react";
import BatchDocumentDataService from "../services/batchdocument.service";

export default class BatchDocument extends Component {
  constructor(props) {
    super(props);
    this.onChangeBatchName = this.onChangeBatchName.bind(this);
    this.onChangeSiteId = this.onChangeSiteId.bind(this);
    this.onChangeUserIdKeyVerified = this.onChangeUserIdKeyVerified.bind(this);
    this.getBatchDocument = this.getBatchDocument.bind(this);
    this.updateBatchDocument = this.updateBatchDocument.bind(this);
    this.deleteBatchDocument = this.deleteBatchDocument.bind(this);

    this.state = {
      currentBatchDocument: {
        batchId: null,
        batchName: "",
        siteId: "",
        userIdKeyVerified: ""
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getBatchDocument(this.props.match.params.batchId);
  }

  onChangeBatchName(e) {
    const batchName = e.target.value;

    this.setState(function(prevState) {
      return {
        currentBatchDocument: {
          ...prevState.currentBatchDocument,
          batchName: batchName
        }
      };
    });
  }

  onChangeSiteId(e) {
    const siteId = e.target.value;
    
    this.setState(prevState => ({
      currentBatchDocument: {
        ...prevState.currentBatchDocument,
        siteId: siteId
      }
    }));
  }

  onChangeUserIdKeyVerified(e) {
    const userIdKeyVerified = e.target.value;
      
    this.setState(prevState => ({
      currentBatchDocument: {
        ...prevState.currentBatchDocument,
        userIdKeyVerified: userIdKeyVerified
      }
    })); 
  }

  getBatchDocument(batchId) {
    BatchDocumentDataService.get(batchId)
      .then(response => {
        this.setState({
          currentBatchDocument: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateBatchDocument() {
    BatchDocumentDataService.update(
      this.state.currentBatchDocument.batchId,
      this.state.currentBatchDocument
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The BatchDocument was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteBatchDocument() {    
    BatchDocumentDataService.delete(this.state.currentBatchDocument.batchId)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/BatchDocuments')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentBatchDocument } = this.state;

    return (
      <div>
        {currentBatchDocument ? (
          <div className="edit-form">
            <h4>BatchDocument</h4>
            <form>
              <div className="form-group">
                <label htmlFor="BatchName">Batch Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="BatchName"
                  value={currentBatchDocument.batchName}
                  onChange={this.onChangeBatchName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="SiteId">Site Id</label>
                <input
                  type="text"
                  className="form-control"
                  id="SiteId"
                  value={currentBatchDocument.siteId}
                  onChange={this.onChangeSiteId}
                />
              </div>
              <div className="form-group">
                <label htmlFor="UserIdKeyVerified">UserIdKeyVerified</label>
                <input
                  type="text"
                  className="form-control"
                  id="SiteId"
                  value={currentBatchDocument.userIdKeyVerified}
                  onChange={this.onChangeUserIdKeyVerified}
                />
              </div>
</form>


            <button
              className="badge bg-danger mr-2"
              onClick={this.deleteBatchDocument}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge bg-success"
              onClick={this.updateBatchDocument}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a BatchDocument...</p>
          </div>
        )}
      </div>
    );
  }
}