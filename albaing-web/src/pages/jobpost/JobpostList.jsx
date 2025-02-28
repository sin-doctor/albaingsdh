import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function JobPostList() {
    const { companyId } = useParams();
    const [jobPosts, setJobPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`/api/company/${companyId}`)
            .then(response => {
                setJobPosts(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError("채용 공고를 불러오는 중 오류가 발생했습니다.");
                setLoading(false);
            });
    }, [companyId]);

    if (loading) return <p className="text-center text-gray-500">로딩 중...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">채용 공고 목록</h2>
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
