import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function JobPostList() {
    const { companyId } = useParams();
    const [jobPosts, setJobPosts] = useState([]);
    const [company, setCompany] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isMyCompany, setIsMyCompany] = useState(false);
    const navigate = useNavigate();

    // 회사 정보와 채용공고를 불러오는 함수
    useEffect(() => {
        // 회사 정보 불러오기
        axios.get(`/api/company/${companyId}`)
            .then(response => {
                setCompany(response.data);
                // 세션 체크를 통해 로그인한 회사인지 확인
                axios.get('/api/auth/check-session')
                    .then(sessionRes => {
                        if (sessionRes.data && sessionRes.data.companyId === parseInt(companyId)) {
                            setIsMyCompany(true);
                        }
                    })
                    .catch(err => console.log("세션 확인 실패"));
            })
            .catch(error => {
                setError("회사 정보를 불러오는 중 오류가 발생했습니다.");
            });

        // 채용공고 목록 불러오기
        axios.get(`/api/company/${companyId}/job-posts`)
            .then(response => {
                setJobPosts(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError("채용 공고를 불러오는 중 오류가 발생했습니다.");
                setLoading(false);
            });
    }, [companyId]);

    // 내 회사 채용공고 목록으로 이동하는 함수
    const goToMyJobPosts = () => {
        navigate('/my-job-posts');
    };

    if (loading) return <p className="text-center text-gray-500">로딩 중...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="p-6">
            {company && (
                <div className="mb-6">
                    <h1 className="text-3xl font-bold">{company.companyName}</h1>
                    <p className="text-gray-600">{company.companyAddress}</p>
                </div>
            )}

            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">채용 공고 목록</h2>
                {isMyCompany && (
                    <button
                        onClick={goToMyJobPosts}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        내 채용공고 관리
                    </button>
                )}
            </div>

            {jobPosts.length === 0 ? (
                <p className="text-gray-500">등록된 채용 공고가 없습니다.</p>
            ) : (
                <div className="grid gap-4">
                    {jobPosts.map(post => (
                        <div key={post.jobPostId} className="p-4 border rounded-lg shadow">
                            <h3 className="text-xl font-semibold">{post.jobPostTitle}</h3>
                            <p className="text-gray-600">직군: {post.jobPostJobCategory}</p>
                            <p className="text-gray-600">근무지: {post.jobPostWorkPlace}</p>
                            <p className="text-gray-600">마감일: {post.jobPostDueDate}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}