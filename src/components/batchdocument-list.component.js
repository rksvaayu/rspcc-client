import React, { Component } from "react";
import BatchDocumentDataService from "../services/batchdocument.service";
import { Link } from "react-router-dom";

export default class BatchDocumentsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchBatchName = this.onChangeSearchBatchName.bind(this);
    this.retrieveBatchDocuments = this.retrieveBatchDocuments.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveBatchDocument = this.setActiveBatchDocument.bind(this);
    this.removeAllBatchDocuments = this.removeAllBatchDocuments.bind(this);
    this.searchBatchName = this.searchBatchName.bind(this);

    this.state = {
      batchDocuments: [],
      currentBatchDocument: null,
      currentIndex: -1,
      searchBatchName: ""
    };
  }

  componentDidMount() {
    this.retrieveBatchDocuments();
  }

  onChangeSearchBatchName(e) {
    const searchBatchName = e.target.value;

    this.setState({
      searchBatchName: searchBatchName
    });
  }

  retrieveBatchDocuments() {
    BatchDocumentDataService.getAll()
      .then(response => {
        this.setState({
          batchDocuments: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveBatchDocuments();
    this.setState({
      currentBatchDocument: null,
      currentIndex: -1
    });
  }

  setActiveBatchDocument(batchDocument, index) {
    this.setState({
      currentBatchDocument: batchDocument,
      currentIndex: index
    });
  }

  removeAllBatchDocuments() {
    BatchDocumentDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchBatchName() {
    this.setState({
      currentBatchDocument: null,
      currentIndex: -1
    });

    BatchDocumentDataService.findByBatchName(this.state.searchBatchName)
      .then(response => {
        this.setState({
          batchDocuments: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchBatchName, batchDocuments, currentBatchDocument, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by BatchName"
              value={searchBatchName}
              onChange={this.onChangeSearchBatchName}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchBatchName}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Batch Documents List</h4>

          <ul className="list-group">
            {batchDocuments &&
              batchDocuments.map((batchDocument, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveBatchDocument(batchDocument, index)}
                  key={index}
                >
                  {batchDocument.batchName}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllBatchDocuments}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentBatchDocument ? (
            <div>
              <h4>BatchDocument</h4>
              <div>
                <label>
                  <strong>BatchName:</strong>
                </label>{" "}
                {currentBatchDocument.batchName}
              </div>
              <div>
                <label>
                  <strong>SiteId:</strong>
                </label>{" "}
                {currentBatchDocument.siteId}
              </div>
              <div>
                <label>
                  <strong>UserIdKeyVerified:</strong>
                </label>{" "}
                {currentBatchDocument.userIdKeyVerified}
              </div>

              <Link
                to={"/BatchDocuments/" + currentBatchDocument.batchId}
                className="badge bg-warning">
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a BatchDocument...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}