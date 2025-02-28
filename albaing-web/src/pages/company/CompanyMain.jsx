import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function CompanyMain() {
    const [selectedTab, setSelectedTab] = useState("overview");
    const [companyInfo, setCompanyInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // 컴포넌트 마운트 시 세션 확인
    useEffect(() => {
        checkSession();
    }, []);

    // 세션 확인 함수
    const checkSession = async () => {
        try {
            const response = await axios.get("/api/auth/check-session");
            setCompanyInfo(response.data);
            setLoading(false);
        } catch (error) {
            console.error("세션 확인 실패:", error);
            // 인증 오류 시 로그인 페이지로 리다이렉트
            if (error.response && error.response.status === 401) {
                alert("로그인이 필요합니다.");
                navigate("/login");
            }
            setLoading(false);
        }
    };

    // 로그아웃 처리 함수
    const handleLogout = async () => {
        try {
            await axios.post("/api/auth/logout");
            alert("로그아웃 되었습니다.");
            navigate("/login");
        } catch (error) {
            console.error("로그아웃 실패:", error);
            alert("로그아웃 중 오류가 발생했습니다.");
        }
    };

    if (loading) {
        return <div className="flex items-center justify-center h-screen">로딩 중...</div>;
    }

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className="w-64 bg-gray-800 text-white p-4 flex flex-col">
                <div className="mb-8">
                    <h2 className="text-xl font-bold mb-2">기업 대시보드</h2>
                    {companyInfo && (
                        <div className="text-sm">
                            <p className="text-gray-300">안녕하세요,</p>
                            <p className="font-medium">{companyInfo.companyName}님</p>
                        </div>
                    )}
                </div>

                <nav className="flex flex-col gap-3 flex-grow">
                    <button
                        className={`text-left p-2 rounded ${selectedTab === "overview" ? "bg-blue-600" : "hover:bg-gray-700"}`}
                        onClick={() => setSelectedTab("overview")}
                    >
                        대시보드
                    </button>
                    <button
                        className={`text-left p-2 rounded ${selectedTab === "job_posts" ? "bg-blue-600" : "hover:bg-gray-700"}`}
                        onClick={() => setSelectedTab("job_posts")}
                    >
                        채용 공고
                    </button>
                    <button
                        className={`text-left p-2 rounded ${selectedTab === "applicants" ? "bg-blue-600" : "hover:bg-gray-700"}`}
                        onClick={() => setSelectedTab("applicants")}
                    >
                        지원자 관리
                    </button>
                    <button
                        className={`text-left p-2 rounded ${selectedTab === "company_info" ? "bg-blue-600" : "hover:bg-gray-700"}`}
                        onClick={() => setSelectedTab("company_info")}
                    >
                        기업 정보 수정
                    </button>
                </nav>

                <button
                    onClick={handleLogout}
                    className="mt-auto p-2 text-left text-red-300 hover:text-red-100"
                >
                    로그아웃
                </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 bg-gray-100">
                {selectedTab === "overview" && (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">기업 대시보드</h2>
                        <div className="bg-white rounded-lg shadow p-6">
                            <p className="mb-4">기업 활동 개요를 확인하세요.</p>
                            {companyInfo && (
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-blue-50 p-4 rounded-lg">
                                        <h3 className="font-bold text-blue-800 mb-2">기업 ID</h3>
                                        <p>{companyInfo.companyId}</p>
                                    </div>
                                    <div className="bg-blue-50 p-4 rounded-lg">
                                        <h3 className="font-bold text-blue-800 mb-2">기업명</h3>
                                        <p>{companyInfo.companyName}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {selectedTab === "job_posts" && (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">채용 공고 관리</h2>
                        <div className="bg-white rounded-lg shadow p-6">
                            <p className="mb-4">현재 등록된 채용 공고를 관리하거나 새 공고를 등록하세요.</p>
                            <div className="flex gap-4">
                                <Link
                                    to={`/company/my-job-posts`}
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded inline-block"
                                >
                                    내 채용공고 관리
                                </Link>
                                <Link
                                    to="/job-post/create"
                                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded inline-block"
                                >
                                    새 채용공고 등록
                                </Link>
                            </div>
                        </div>
                    </div>
                )}

                {selectedTab === "applicants" && (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">지원자 관리</h2>
                        <div className="bg-white rounded-lg shadow p-6">
                            <p>지원자 정보를 확인하고 관리할 수 있습니다.</p>
                            <Link
                                to="/company/applicants"
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-4 inline-block"
                            >
                                지원자 관리 페이지로 이동
                            </Link>
                        </div>
                    </div>
                )}

                {selectedTab === "company_info" && (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">기업 정보 수정</h2>
                        <div className="bg-white rounded-lg shadow p-6">
                            <p>회사 정보를 수정하고 프로필을 관리할 수 있습니다.</p>
                            <Link
                                to="/company/edit-info"
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-4 inline-block"
                            >
                                기업 정보 수정 페이지로 이동
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}