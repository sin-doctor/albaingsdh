import { useState } from "react";
import { Link } from "react-router-dom";

export default function CompanyMain() {
    const [selectedTab, setSelectedTab] = useState("overview");

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className="w-64 bg-gray-800 text-white p-4 flex flex-col">
                <h2 className="text-xl font-bold mb-4">기업 대시보드</h2>
                <nav className="flex flex-col gap-2">
                    <button className="text-left" onClick={() => setSelectedTab("overview")}>대시보드</button>
                    <button className="text-left" onClick={() => setSelectedTab("job_posts")}>채용 공고</button>
                    <button className="text-left" onClick={() => setSelectedTab("applicants")}>지원자 관리</button>
                    <button className="text-left" onClick={() => setSelectedTab("company_info")}>기업 정보 수정</button>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6">
                {selectedTab === "overview" && (
                    <div>
                        <h2 className="text-2xl font-bold mb-2">기업 대시보드</h2>
                        <p>기업 활동 개요를 확인하세요.</p>
                    </div>
                )}

                {selectedTab === "job_posts" && (
                    <div>
                        <h2 className="text-2xl font-bold mb-2">채용 공고</h2>
                        <Link to="/company/jobposts" className="text-blue-500">공고 관리 페이지로 이동</Link>
                    </div>
                )}

                {selectedTab === "applicants" && (
                    <div>
                        <h2 className="text-2xl font-bold mb-2">지원자 관리</h2>
                        <Link to="/company/applicants" className="text-blue-500">지원자 관리 페이지로 이동</Link>
                    </div>
                )}

                {selectedTab === "company_info" && (
                    <div>
                        <h2 className="text-2xl font-bold mb-2">기업 정보 수정</h2>
                        <Link to="/company/edit-info" className="text-blue-500">기업 정보 수정 페이지로 이동</Link>
                    </div>
                )}
            </div>
        </div>
    );
}