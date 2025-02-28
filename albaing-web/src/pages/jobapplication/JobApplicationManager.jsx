import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function ApplicantManager() {
    const { jobPostId } = useParams();
    const [applicants, setApplicants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`/api/applicants/${jobPostId}`)
            .then((response) => {
                setApplicants(response.data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [jobPostId]);

    const updateStatus = (applicantId, status) => {
        axios.patch(`/api/applicants/${applicantId}/status`, { status })
            .then(() => {
                setApplicants(applicants.map(applicant =>
                    applicant.applicantId === applicantId ? { ...applicant, status } : applicant
                ));
            })
            .catch((err) => alert("상태 변경에 실패했습니다."));
    };

    if (loading) return <p>불러오는 중...</p>;
    if (error) return <p>오류 발생: {error}</p>;

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">지원자 관리</h2>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                <tr className="bg-gray-100">
                    <th className="border p-2">이름</th>
                    <th className="border p-2">이메일</th>
                    <th className="border p-2">전화번호</th>
                    <th className="border p-2">상태</th>
                    <th className="border p-2">관리</th>
                </tr>
                </thead>
                <tbody>
                {applicants.map((applicant) => (
                    <tr key={applicant.applicantId}>
                        <td className="border p-2">{applicant.name}</td>
                        <td className="border p-2">{applicant.email}</td>
                        <td className="border p-2">{applicant.phone}</td>
                        <td className="border p-2">{applicant.status}</td>
                        <td className="border p-2">
                            <button className="bg-green-500 text-white p-1 mr-2" onClick={() => updateStatus(applicant.applicantId, "승인")}>승인</button>
                            <button className="bg-red-500 text-white p-1" onClick={() => updateStatus(applicant.applicantId, "반려")}>반려</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
