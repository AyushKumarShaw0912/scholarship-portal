import ExcelJS from "exceljs";
import { NextResponse } from "next/server";
import { headers as getHeaders } from "next/headers";

import { getPayloadClient } from "@/lib/cms/client";

export const runtime = "nodejs";

const BOARD_LABELS: Record<string, string> = {
  wbbse: "WBBSE (Madhyamik)",
  cbse: "CBSE",
  icse: "ICSE",
  other: "Other",
};

export async function GET() {
  const payload = await getPayloadClient();
  const headerStore = await getHeaders();
  const { user } = await payload.auth({ headers: headerStore });

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result = await payload.find({
    collection: "applications",
    depth: 0,
    limit: 1000,
    pagination: false,
    sort: "-createdAt",
    overrideAccess: false,
    user,
  });

  const workbook = new ExcelJS.Workbook();
  workbook.creator = "Scholarship Portal";
  const sheet = workbook.addWorksheet("Applications");

  sheet.columns = [
    { header: "Submitted", key: "createdAt", width: 22 },
    { header: "Name", key: "fullName", width: 24 },
    { header: "Email", key: "email", width: 28 },
    { header: "Phone", key: "phone", width: 16 },
    { header: "Guardian phone", key: "guardianPhone", width: 16 },
    { header: "Target", key: "target", width: 10 },
    { header: "Board", key: "board", width: 20 },
    { header: "School", key: "schoolName", width: 28 },
    { header: "Class 8 %", key: "class8Percentage", width: 12 },
    { header: "Class 9 %", key: "class9Percentage", width: 12 },
    { header: "Class 10 pre-board %", key: "class10PreBoardPercentage", width: 18 },
    { header: "Class 10 total", key: "class10TotalMarks", width: 14 },
    { header: "Class 10 max", key: "class10MaxMarks", width: 12 },
    { header: "Subject 1", key: "subject1Name", width: 18 },
    { header: "S1 obtained", key: "subject1Obtained", width: 12 },
    { header: "S1 max", key: "subject1Max", width: 10 },
    { header: "Subject 2", key: "subject2Name", width: 18 },
    { header: "S2 obtained", key: "subject2Obtained", width: 12 },
    { header: "S2 max", key: "subject2Max", width: 10 },
    { header: "Subject 3", key: "subject3Name", width: 18 },
    { header: "S3 obtained", key: "subject3Obtained", width: 12 },
    { header: "S3 max", key: "subject3Max", width: 10 },
    { header: "Subject 4", key: "subject4Name", width: 18 },
    { header: "S4 obtained", key: "subject4Obtained", width: 12 },
    { header: "S4 max", key: "subject4Max", width: 10 },
    { header: "Subject 5", key: "subject5Name", width: 18 },
    { header: "S5 obtained", key: "subject5Obtained", width: 12 },
    { header: "S5 max", key: "subject5Max", width: 10 },
    { header: "Academic trend", key: "academicTrend", width: 14 },
    { header: "Trend score", key: "trendScore", width: 12 },
    { header: "Status", key: "status", width: 14 },
    { header: "Parents name", key: "parentsName", width: 24 },
    { header: "Parents profession", key: "parentsProfession", width: 24 },
    { header: "Household income (INR)", key: "householdIncome", width: 18 },
    { header: "Address", key: "address", width: 40 },
    { header: "Academic achievements", key: "academicAchievements", width: 36 },
  ];

  for (const doc of result.docs) {
    const board = String(doc.board ?? "");
    sheet.addRow({
      createdAt: doc.createdAt ? new Date(doc.createdAt).toISOString() : "",
      fullName: doc.fullName,
      email: doc.email,
      phone: doc.phone,
      guardianPhone: doc.guardianPhone,
      target: String(doc.target ?? "").toUpperCase(),
      board: BOARD_LABELS[board] ?? board,
      schoolName: doc.schoolName,
      class8Percentage: doc.class8Percentage,
      class9Percentage: doc.class9Percentage,
      class10PreBoardPercentage: doc.class10PreBoardPercentage,
      class10TotalMarks: doc.class10TotalMarks,
      class10MaxMarks: doc.class10MaxMarks,
      subject1Name: doc.subject1Name,
      subject1Obtained: doc.subject1Obtained,
      subject1Max: doc.subject1Max,
      subject2Name: doc.subject2Name,
      subject2Obtained: doc.subject2Obtained,
      subject2Max: doc.subject2Max,
      subject3Name: doc.subject3Name,
      subject3Obtained: doc.subject3Obtained,
      subject3Max: doc.subject3Max,
      subject4Name: doc.subject4Name,
      subject4Obtained: doc.subject4Obtained,
      subject4Max: doc.subject4Max,
      subject5Name: doc.subject5Name,
      subject5Obtained: doc.subject5Obtained,
      subject5Max: doc.subject5Max,
      academicTrend: doc.academicTrend,
      trendScore: doc.trendScore,
      status: doc.status,
      parentsName: doc.parentsName,
      parentsProfession: doc.parentsProfession,
      householdIncome: doc.householdIncome,
      address: doc.address,
      academicAchievements: doc.academicAchievements ?? "",
    });
  }

  sheet.getRow(1).font = { bold: true };

  const buffer = await workbook.xlsx.writeBuffer();
  const filename = `applications-${new Date().toISOString().slice(0, 10)}.xlsx`;

  return new NextResponse(Buffer.from(buffer), {
    status: 200,
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}
