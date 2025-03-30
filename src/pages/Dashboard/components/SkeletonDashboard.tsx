
import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="pt-24 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start justify-between mb-8">
            <div>
              <Skeleton className="h-8 w-48 bg-gray-800" />
              <Skeleton className="h-5 w-64 mt-2 bg-gray-800" />
            </div>
            
            <div className="mt-4 md:mt-0">
              <Skeleton className="h-10 w-36 bg-gray-800 rounded-md" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              {/* Pass Card Skeleton */}
              <div className="bg-gray-800/70 backdrop-blur-md rounded-xl overflow-hidden border border-gray-700 shadow-xl">
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-4">
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-7 w-36 bg-gray-700" />
                    <Skeleton className="h-6 w-20 bg-gray-700 rounded-full" />
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                    <div>
                      <Skeleton className="h-6 w-48 bg-gray-700" />
                      <Skeleton className="h-4 w-36 mt-2 bg-gray-700" />
                    </div>
                    <div className="mt-4 md:mt-0">
                      <Skeleton className="h-6 w-28 bg-gray-700 rounded-full" />
                    </div>
                  </div>
                  
                  <Skeleton className="w-full h-48 bg-gray-700 rounded-lg mb-6" />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex">
                      <Skeleton className="h-8 w-8 bg-gray-700 mr-3" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-5 w-24 bg-gray-700" />
                        <Skeleton className="h-4 w-full bg-gray-700" />
                      </div>
                    </div>
                    
                    <div className="flex">
                      <Skeleton className="h-8 w-8 bg-gray-700 mr-3" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-5 w-24 bg-gray-700" />
                        <Skeleton className="h-4 w-full bg-gray-700" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-700">
                    <div className="flex items-center">
                      <Skeleton className="h-10 w-10 bg-gray-700 rounded-full mr-4" />
                      <div>
                        <Skeleton className="h-5 w-36 bg-gray-700" />
                        <Skeleton className="h-4 w-48 mt-1 bg-gray-700" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Payment Info Skeleton */}
              <div className="bg-gray-800/70 backdrop-blur-md rounded-xl p-6 border border-gray-700">
                <Skeleton className="h-7 w-48 mb-4 bg-gray-700" />
                <Skeleton className="h-24 w-full rounded-lg mb-4 bg-gray-700" />
                
                <div className="flex items-start mb-6">
                  <Skeleton className="h-7 w-7 bg-gray-700 mr-3" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-28 bg-gray-700" />
                    <Skeleton className="h-4 w-32 bg-gray-700" />
                    <Skeleton className="h-8 w-40 mt-2 bg-gray-700" />
                  </div>
                </div>
                
                <div className="border-t border-gray-700 pt-4">
                  <Skeleton className="h-4 w-36 bg-gray-700" />
                </div>
              </div>
              
              {/* Merchandise Info Skeleton */}
              <div className="bg-gray-800/70 backdrop-blur-md rounded-xl p-6 border border-gray-700">
                <Skeleton className="h-7 w-40 mb-4 bg-gray-700" />
                
                <div className="space-y-4">
                  {[1, 2].map((item) => (
                    <div key={item} className="flex items-start">
                      <Skeleton className="h-7 w-7 bg-gray-700 mr-3" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-5 w-36 bg-gray-700" />
                        <Skeleton className="h-4 w-full bg-gray-700" />
                        <Skeleton className="h-3 w-48 mt-1 bg-gray-700" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              {/* Profile Info Skeleton */}
              <div className="bg-gray-800/70 backdrop-blur-md rounded-xl p-6 border border-gray-700">
                <Skeleton className="h-7 w-48 mb-4 bg-gray-700" />
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Skeleton className="h-6 w-6 bg-gray-700 mr-3" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-5 w-20 bg-gray-700" />
                      <Skeleton className="h-4 w-32 bg-gray-700" />
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Skeleton className="h-6 w-6 bg-gray-700 mr-3" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-5 w-20 bg-gray-700" />
                      <Skeleton className="h-4 w-48 bg-gray-700" />
                      <Skeleton className="h-4 w-20 bg-gray-700 rounded-full" />
                    </div>
                  </div>
                  
                  <Skeleton className="h-px w-full bg-gray-700" />
                  
                  <Skeleton className="h-10 w-full rounded-md bg-gray-700" />
                </div>
              </div>
              
              {/* Important Dates Skeleton */}
              <div className="bg-gray-800/70 backdrop-blur-md rounded-xl p-6 border border-gray-700">
                <Skeleton className="h-7 w-36 mb-4 bg-gray-700" />
                
                <div className="space-y-4">
                  {[1, 2, 3].map((date) => (
                    <React.Fragment key={date}>
                      <div className="flex items-center">
                        <Skeleton className="h-12 w-12 rounded-full bg-gray-700 mr-4" />
                        <div className="space-y-2">
                          <Skeleton className="h-5 w-32 bg-gray-700" />
                          <Skeleton className="h-4 w-24 bg-gray-700" />
                        </div>
                      </div>
                      {date < 3 && <Skeleton className="h-px w-full bg-gray-700" />}
                    </React.Fragment>
                  ))}
                </div>
              </div>
              
              {/* Support Section Skeleton */}
              <div className="bg-gray-800/70 backdrop-blur-md rounded-xl p-6 border border-gray-700">
                <Skeleton className="h-7 w-28 mb-4 bg-gray-700" />
                <Skeleton className="h-16 w-full mb-4 bg-gray-700" />
                <Skeleton className="h-10 w-full rounded-md bg-gray-700" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonDashboard;
