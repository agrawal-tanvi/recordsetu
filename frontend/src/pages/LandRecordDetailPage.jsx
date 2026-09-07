import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import DocumentPreview from '../components/DocumentPreview';
import { getDocument } from '../services/api';
import { ArrowLeft, Map, AlertCircle, RefreshCw, CheckCircle, Edit } from 'lucide-react';

export const LandRecordDetailPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recordData, setRecordData] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const loadRecord = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getDocument(id);
        if (!isMounted) return;

        const doc = data?.document || {};
        const lr = data?.land_record || {};
        const val = data?.validation || {};

        const getValue = (f) => (f && typeof f === 'object' ? f.value : f);
        const getConf = (f) => (f && typeof f === 'object' ? f.confidence : undefined);

        const areaVal = getValue(lr.area);
        const unitVal = getValue(lr.area_unit);
        const areaStr = areaVal != null ? `${areaVal} ${unitVal || ''}`.trim() : 'Not extracted';

        setRecordData({
          id: doc.document_id || id,
          status: doc.status || 'DIGITIZED',
          state: 'Uttar Pradesh',
          district: getValue(lr.district) || 'Not extracted',
          tehsil: 'Not extracted',
          village: getValue(lr.village) || 'Not extracted',
          khasraNo: getValue(lr.khasra_no) || 'Not extracted',
          khasraConfidence: getConf(lr.khasra_no),
          ownerName: getValue(lr.owner_name) || 'Not extracted',
          ownerConfidence: getConf(lr.owner_name),
          villageConfidence: getConf(lr.village),
          districtConfidence: getConf(lr.district),
          areaHectares: areaStr,
          areaConfidence: getConf(lr.area),
          areaUnit: unitVal || 'Not extracted',
          areaUnitConfidence: getConf(lr.area_unit),
          validation: val
        });
      } catch (err) {
        if (!isMounted) return;
        setError(err.message || `Record not found: ${id}`);
        setRecordData(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    if (id) {
      loadRecord();
    }
    return () => {
      isMounted = false;
    };
  }, [id]);

  return (
    <div className="record-detail-page">
      <div className="page-header-bar">
        <div className="container header-bar-inner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/land-records/search" className="btn btn-outline btn-sm">
              <ArrowLeft size={14} /> Back to Search
            </Link>
            <div>
              <div className="breadcrumbs">
                <span>Land Records</span> / <strong>Record #{id}</strong>
              </div>
              <h1 className="page-title">प्रमाणित अधिकार अभिलेख (खतौनी / RoR Copy)</h1>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
            {recordData?.status === 'REVIEW_REQUIRED' && (
              <Link
                to={`/verify?documentId=${recordData.id}`}
                className="btn btn-primary btn-sm"
                style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
              >
                <Edit size={14} /> Open for Review / Correction
              </Link>
            )}
            <Link
              to="/maps"
              className="btn btn-secondary btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <Map size={14} /> Inspect on Bhu-Naksha Map
            </Link>
          </div>
        </div>
      </div>

      <div className="container page-body-container" style={{ margin: '2rem auto' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem 2rem', background: '#fff', borderRadius: '8px', border: '1px solid #CBD5E1' }}>
            <RefreshCw size={36} style={{ margin: '0 auto 1rem auto', color: '#163A63', animation: 'spin 1s linear infinite' }} />
            <h3>Loading land record details...</h3>
            <p style={{ color: '#64748B' }}>Fetching verified ledger data from backend repository</p>
          </div>
        ) : error ? (
          <div style={{ textAlign: 'center', padding: '4rem 2rem', background: '#fff', borderRadius: '8px', border: '1px solid #FECACA' }}>
            <AlertCircle size={40} style={{ margin: '0 auto 1rem auto', color: '#DC2626' }} />
            <h3 style={{ color: '#DC2626' }}>Record Not Found or Error</h3>
            <p style={{ color: '#64748B', marginBottom: '1.5rem' }}>{error}</p>
            <Link to="/land-records/search" className="btn btn-outline btn-sm">
              <ArrowLeft size={14} /> Return to Search
            </Link>
          </div>
        ) : recordData ? (
          <DocumentPreview record={recordData} />
        ) : null}
      </div>
    </div>
  );
};

export default LandRecordDetailPage;
