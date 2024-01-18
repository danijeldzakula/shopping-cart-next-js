import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Pagination from "./pagination";
import IssueCards from "./issueCards";
import { useState, useEffect } from "react";
import axios from "axios";

const Newsletters = () => {
  const [issues, setIssues] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [issuesPerPage, setIssuesPerPage] = useState(5);

  useEffect(() => {
    const fetchIssue = async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/newsletters`
      );
      setIssues(res.data);
    };
    fetchIssue();
  }, []);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastIssue = currentPage * issuesPerPage;
  const indexOfFirstIssue = indexOfLastIssue - issuesPerPage;
  const currentIssues = issues.slice(indexOfFirstIssue, indexOfLastIssue);

  return (
    <>
      <Navbar />
      <div className="newsletter-container" id="newsletter-container">
        <h1>Newsletters</h1>
        <hr></hr>
        <div className="newsletter-wrapper">
          <IssueCards issues={currentIssues} />
          <Pagination
            issuesPerPage={issuesPerPage}
            totalIssues={issues.length}
            paginate={paginate}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Newsletters;
