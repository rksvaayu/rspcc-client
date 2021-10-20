import http from "../http-common";

class BatchDocumentDataService {
  getAll() {
    return http.get("/BatchDocuments");
  }

  get(BatchId) {
    return http.get(`/BatchDocuments/${BatchId}`);
  }

  create(data) {
    console.log(data);
    return http.post("/BatchDocuments", data);
  }

  update(BatchId, data) {
    return http.put(`/BatchDocuments/${BatchId}`, data);
  }

  delete(BatchId) {
    return http.delete(`/BatchDocuments/${BatchId}`);
  }

  deleteAll() {
    return http.delete(`/BatchDocuments`);
  }

  findByBatchName(BatchName) {
    return http.get(`/BatchDocuments?BatchName=${BatchName}`);
  }
}
export default new BatchDocumentDataService();
