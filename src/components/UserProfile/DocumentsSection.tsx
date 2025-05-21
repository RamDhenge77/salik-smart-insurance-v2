import { UserProfile } from "@/types/user";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Camera, File } from "lucide-react";

interface DocumentsSectionProps {
  profile: UserProfile;
  updateDocument: (
    docType: keyof UserProfile["documents"],
    value: string
  ) => void;
}

export const DocumentsSection = ({
  profile,
  updateDocument,
}: DocumentsSectionProps) => {
  // This would be a file upload in a real application
  const simulateFileUpload = (docType: keyof UserProfile["documents"]) => {
    // Simulate a file upload by setting a placeholder URL
    const timestamp = new Date().getTime();
    updateDocument(
      docType,
      `https://placeholder-file-${docType}-${timestamp}.pdf`
    );
  };

  return (
    <Card>
      <CardHeader className="bg-uae-primary text-white rounded-t-lg">
        <div className="flex items-center gap-2">
          <File size={20} />
          <CardTitle className="text-lg text-white">Documents</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DocumentUploadCard
            title="Mulkiya (Registration Card)"
            docUploaded={!!profile.documents.mulkiya}
            onUpload={() => simulateFileUpload("mulkiya")}
          />

          <DocumentUploadCard
            title="Driving License"
            docUploaded={!!profile.documents.license}
            onUpload={() => simulateFileUpload("license")}
          />

          <DocumentUploadCard
            title="Insurance Policy"
            docUploaded={!!profile.documents.insurance}
            onUpload={() => simulateFileUpload("insurance")}
          />
        </div>

        <div className="flex justify-end mt-6">
          <Button
            variant="primary"
            type="button"
            className=""
          >
            Save Documents
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

interface DocumentUploadCardProps {
  title: string;
  docUploaded: boolean;
  onUpload: () => void;
}

const DocumentUploadCard = ({
  title,
  docUploaded,
  onUpload,
}: DocumentUploadCardProps) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 flex flex-col items-center">
      <div className="h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center mb-4">
        <File size={32} className="text-gray-400" />
      </div>
      <h3 className="font-medium text-center mb-2">{title}</h3>

      {docUploaded ? (
        <div className="mt-2 text-center">
          <Badge
            variant="outline"
            className="bg-green-50 text-green-600 border-green-200"
          >
            Uploaded
          </Badge>
          <p className="text-xs text-gray-500 mt-2">Click below to update</p>
        </div>
      ) : (
        <p className="text-xs text-gray-500 text-center mb-3">
          Upload a clear copy of your {title.toLowerCase()}
        </p>
      )}

      <Button
        variant={docUploaded ? "outline" : "default"}
        size="sm"
        className={docUploaded ? "bg-white hover:bg-btn-secondary" : "bg-btn-primary text-btn-textPrimary hover:bg-btn-secondary"}
        onClick={onUpload}
      >
        <Camera size={16} className="mr-1" />
        {docUploaded ? "Update Document" : "Upload Document"}
      </Button>
    </div>
  );
};
