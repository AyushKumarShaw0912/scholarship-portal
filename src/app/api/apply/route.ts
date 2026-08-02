import { NextResponse } from "next/server";

import { applyContent } from "@/data/apply";
import { getPayloadClient } from "@/lib/cms/client";
import { parseApplicationFields } from "@/lib/apply-validation";

export const runtime = "nodejs";

function asString(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value : "";
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    if (asString(formData.get("website")).trim()) {
      return NextResponse.json({ ok: true });
    }

    const parsed = parseApplicationFields({
      fullName: asString(formData.get("fullName")),
      email: asString(formData.get("email")),
      phone: asString(formData.get("phone")),
      guardianPhone: asString(formData.get("guardianPhone")),
      target: asString(formData.get("target")),
      board: asString(formData.get("board")),
      schoolName: asString(formData.get("schoolName")),
      class8Percentage: asString(formData.get("class8Percentage")),
      class9Percentage: asString(formData.get("class9Percentage")),
      class10PreBoardPercentage: asString(
        formData.get("class10PreBoardPercentage"),
      ),
      class10TotalMarks: asString(formData.get("class10TotalMarks")),
      class10MaxMarks: asString(formData.get("class10MaxMarks")),
      subject1Name: asString(formData.get("subject1Name")),
      subject1Obtained: asString(formData.get("subject1Obtained")),
      subject1Max: asString(formData.get("subject1Max")),
      subject2Name: asString(formData.get("subject2Name")),
      subject2Obtained: asString(formData.get("subject2Obtained")),
      subject2Max: asString(formData.get("subject2Max")),
      subject3Name: asString(formData.get("subject3Name")),
      subject3Obtained: asString(formData.get("subject3Obtained")),
      subject3Max: asString(formData.get("subject3Max")),
      subject4Name: asString(formData.get("subject4Name")),
      subject4Obtained: asString(formData.get("subject4Obtained")),
      subject4Max: asString(formData.get("subject4Max")),
      subject5Name: asString(formData.get("subject5Name")),
      subject5Obtained: asString(formData.get("subject5Obtained")),
      subject5Max: asString(formData.get("subject5Max")),
      academicAchievements: asString(formData.get("academicAchievements")),
      address: asString(formData.get("address")),
      parentsName: asString(formData.get("parentsName")),
      parentsProfession: asString(formData.get("parentsProfession")),
      householdIncome: asString(formData.get("householdIncome")),
    });

    if ("error" in parsed) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }

    const { academicAchievements, ...rest } = parsed.data;
    const payload = await getPayloadClient();

    await payload.create({
      collection: "applications",
      data: {
        ...rest,
        ...(academicAchievements ? { academicAchievements } : {}),
        status: "new",
      },
      overrideAccess: true,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Apply submission failed:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : applyContent.form.errors.server,
      },
      { status: 500 },
    );
  }
}
