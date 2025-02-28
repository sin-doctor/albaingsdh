import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function JobPostAdd() {
    const navigate = useNavigate();
    const [jobPost, setJobPost] = useState({
        jobPostTitle: "",
        jobPostOptionalImage: "",
        jobPostContactNumber: "",
        jobPostRequiredEducations: "",
        jobPostJobCategory: "",
        jobPostJobType: "",
        jobPostWorkingPeriod: "",
        jobWorkSchedule: "",
        jobPostShiftHours: "",
        jobPostSalary: "",
        jobPostWorkPlace: "",
        jobPostDueDate: "",
    });

    const handleChange = (e) => {
        setJobPost({ ...jobPost, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/api/jobs", jobPost);
            alert("채용 공고가 등록되었습니다.");
            navigate("/CompanyMain"); // 등록 후 기업 메인 페이지로 이동
        } catch (error) {
            console.error("채용 공고 등록 실패", error);
            alert("채용 공고 등록에 실패했습니다.");
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4">채용 공고 추가</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="jobPostTitle" placeholder="공고 제목" onChange={handleChange} className="w-full p-2 border rounded" required />
                <input type="text" name="jobPostOptionalImage" placeholder="이미지 URL" onChange={handleChange} className="w-full p-2 border rounded" />
                <input type="text" name="jobPostContactNumber" placeholder="연락처" onChange={handleChange} className="w-full p-2 border rounded" required />
                <input type="text" name="jobPostRequiredEducations" placeholder="학력 요구사항" onChange={handleChange} className="w-full p-2 border rounded" />
                <input type="text" name="jobPostJobCategory" placeholder="직무 카테고리" onChange={handleChange} className="w-full p-2 border rounded" required />
                <input type="text" name="jobPostJobType" placeholder="고용 형태" onChange={handleChange} className="w-full p-2 border rounded" required />
                <input type="text" name="jobPostWorkingPeriod" placeholder="근무 기간" onChange={handleChange} className="w-full p-2 border rounded" />
                <input type="text" name="jobWorkSchedule" placeholder="근무 일정" onChange={handleChange} className="w-full p-2 border rounded" />
                <input type="text" name="jobPostShiftHours" placeholder="교대 근무 시간" onChange={handleChange} className="w-full p-2 border rounded" />
                <input type="text" name="jobPostSalary" placeholder="급여" onChange={handleChange} className="w-full p-2 border rounded" required />
                <input type="text" name="jobPostWorkPlace" placeholder="근무 장소" onChange={handleChange} className="w-full p-2 border rounded" required />
                <input type="date" name="jobPostDueDate" onChange={handleChange} className="w-full p-2 border rounded" required />

                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                    채용 공고 등록
                </button>
            </form>
        </div>
    );
}
