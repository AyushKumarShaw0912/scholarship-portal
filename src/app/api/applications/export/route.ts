import ExcelJS from "exceljs";
import { NextResponse } from "next/server";
import { headers as getHeaders } from "next/headers";

import { getPayloadClient } from "@/lib/cms/client";

export const runtime = "nodejs";

type MediaLike =
  | number
  | string
  | {
      url?: string | null;
    }
  | null
  | undefined;

function mediaUrl(value: MediaLike): string {
  if (!value || typeof value === "number" || typeof value === "string") {
    return "";
  }

  return value.url ?? "";
}

export async function GET() {
  const payload = await getPayloadClient();
  const headerStore = await getHeaders();
  const { user } = await payload.auth({ headers: headerStore });

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result = await payload.find({
    collection: "applications",
    depth: 1,
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
    { header: "Target", key: "target", width: 10 },
    { header: "Status", key: "status", width: 14 },
    { header: "Parents name", key: "parentsName", width: 24 },
    { header: "Parents profession", key: "parentsProfession", width: 24 },
    { header: "Household income (INR)", key: "householdIncome", width: 18 },
    { header: "Address", key: "address", width: 40 },
    { header: "Academic achievements", key: "academicAchievements", width: 36 },
    { header: "Class 10 board marksheet URL", key: "class10Board", width: 40 },
    {
      header: "Class 10 pre-board marksheet URL",
      key: "class10PreBoard",
      width: 40,
    },
    { header: "Class 8 marksheet URL", key: "class8", width: 40 },
    { header: "Class 9 marksheet URL", key: "class9", width: 40 },
  ];

  for (const doc of result.docs) {
    sheet.addRow({
      createdAt: doc.createdAt ? new Date(doc.createdAt).toISOString() : "",
      fullName: doc.fullName,
      target: String(doc.target ?? "").toUpperCase(),
      status: doc.status,
      parentsName: doc.parentsName,
      parentsProfession: doc.parentsProfession,
      householdIncome: doc.householdIncome,
      address: doc.address,
      academicAchievements: doc.academicAchievements ?? "",
      class10Board: mediaUrl(doc.class10BoardMarksheet as MediaLike),
      class10PreBoard: mediaUrl(doc.class10PreBoardMarksheet as MediaLike),
      class8: mediaUrl(doc.class8Marksheet as MediaLike),
      class9: mediaUrl(doc.class9Marksheet as MediaLike),
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
